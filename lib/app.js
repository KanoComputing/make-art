/*
 * Angular app module
 *
 * Define behaviour for app `run` and `config`
 */
import config from './core/config.js';
import { Telemetry } from './core/telemetry.js';
import { angular } from './modules/angular.js';
import { setupAuth } from './auth.js';
import * as icons from './icons.js';
import { prepareGamification } from './gamification.js';
import ClientFactory from './api/api.js';

export const app = angular.module('draw', ['ngRoute'], ['$compileProvider', function ($compileProvider) {
    // We gain compileProvider to Fix unsafe: Ms-appx-web issues in angular found in windows10 uwp app
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension|ms-appx-web|ms-appx):|data:image\//);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|ms-appx-web|ms-appx):/);
}]);

const api = ClientFactory(config.API_URL_V2);

app.constant('API', api);

// Configure app
app.config(['$locationProvider', '$compileProvider', ($locationProvider, $compileProvider) => {
    $locationProvider.html5Mode(true);
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|ms-appx-web):/);
}]);

// Run app
app.run(['$rootScope', '$window', '$location', '_config', ($rootScope, $window, $location, _config) => {
    // immediately set config for the template 
    // it's needed because othwerwise it's gonna be call before the variable it's define
    $rootScope._config = _config;
    $rootScope.icons = icons;
    const win = angular.element($window);

    /**
     * Loads the user profile inside the $rootScope
     * @param  {string} userId the UserId
     */
    $rootScope.loadUserProfile = function (userId) {
        if (!config.OFFLINE) {
            api.profile.getProfile({userId: userId}).then(function (res) {
                var user = (res && res.body) ? res.body.user : undefined;
                if (user) {
                    $rootScope.user.profile = user.profile;
                }
                $rootScope.$broadcast('user-profile-loaded');
                $rootScope.$apply();
            });
        }
    }

    /**
     * Updates the user and loggedIn state in the $rootScope
     */
    $rootScope.updateUser = function (user) {
        if (user) {
            const { avatar } = user;
            const parsed = new URL(avatar);
            user.avatar = `${parsed.origin}/${user.id}/vanilla/head.png`;
            $rootScope.loggedIn = true;
            if (user.admin_level > 0) {
                $rootScope.loadUserProfile(user.id);
            }
            $rootScope.$apply();
        } else {
            $rootScope.loggedIn = false;
        }
        $rootScope.user = user;
        prepareGamification(api.client, user ? user.id : 'anonymous', 'anonymous')
            .then((gamificationClient) => {
                $rootScope.gamification = gamificationClient;
                $rootScope.loadProgress();
            });
    };

    /**
     * Loads the user progress into the $rootScope
     */
    $rootScope.loadProgress = function () {
        return $rootScope.gamification.getPartialProgress($rootScope.user ? $rootScope.user.id : 'anonymous', ['make-art-challenges'])
            .then((progress) => {
                $rootScope.$apply(() => {
                    $rootScope.progress = progress['make-art-challenges'];
                });
            });
    }

    // Define global app initial values
    $rootScope.cfg = config;
    $rootScope.api = api;
    $rootScope.offline = config.OFFLINE;
    $rootScope.loggedIn = false;
    $rootScope.user = null;
    $rootScope.auth = {
        mode: 'login',
        showModal: false,
        setup: function () {
            return setupAuth($rootScope, config);
        },
        openModal: function (type) {
            $rootScope.auth.setup()
                .then(() => {
                    $rootScope.$apply(() => {
                        this.mode = type;
                        this.showModal = true;

                        this.ui = $rootScope.auth.KanoAuth.createUI(config);
                        const container = document.getElementById('auth-container');
                        const node = this.ui.getDomNode();
                        container.appendChild(node);
                        this.ui.onDidChangeView((view) => {
                            const size = view === 'login' ? 360 : 480;
                            node.style.width = `${size}px`;
                            node.style.height = `${size}px`;
                        });
                        const promise = type === 'login' ? this.ui.requestLogin() : this.ui.requestSignup();
                        promise.then((session) => {
                            api.session.updateSession(session);
                            return api.user.me();
                        })
                        .then((user) => {
                            $rootScope.updateUser(user);
                            this.ui.dispose();
                            this.ui = null;
                            $rootScope.auth.closeModal();
                            if ($rootScope.postAuthAction) {
                                $rootScope.postAuthAction();
                            }
                        }).catch((e) => {
                            $rootScope.auth.closeModal();
                        });
                    });
                }).catch(() => {
                    alert('Unable to login right now.');
                });
        },
        closeModal: function () {
            if (this.ui) {
                this.ui.cancel();
                this.ui.dispose();
                this.ui = null;
            }
            $rootScope.$apply(() => {
                this.showModal = false;
            });
        },
        overlayClicked: function (e) {
            if (e.target.classList.contains('modal-overlay')) {
                $rootScope.auth.closeModal();
            }
        }
    };

    $rootScope.logout = function() {
        api.session.logout();
        Telemetry.trackEvent({ name: 'logged_out', properties: { id: $rootScope.user.id } });
        $rootScope.updateUser(null);
    };

    $rootScope.banner = {
        showModal: false,
        openModal: function () { this.showModal = true; },
        closeModal: function () { this.showModal = false; }
    };

    // Initialised auth state
    api.session.reloadSession();
    const session = api.session.getSession();
    if (!session) {
        $rootScope.updateUser(null);
    } else {
        api.session.updateSession(session)
        api.user.me()
            .then(u => $rootScope.updateUser(u))
            .catch(e => {
                $rootScope.updateUser(null);
                throw e;
            });
    }

    /*
     * Update progress
     * @param {string} worldId the id of the world
     * @param {Number} challengeNo the new challenge
     * @return void
     */
    $rootScope.updateProgress = function (world, id) {
        $rootScope.gamification.trigger({ name: 'make-art-challenge-completed', detail: { world, id } })
            .then(() => {
                $rootScope.loadProgress();
            });
    };

    // Listen for key press
    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $rootScope.$apply();
        }
    });

    // Update basePath on route change
    $rootScope.$on('$routeChangeSuccess', function (e, route) {
        var path = route.$$route ? route.$$route.originalPath : null;
        var redirection = route.$$route ? route.$$route.redirectTo : null;
        $rootScope.basePath = path ? path.split('/')[1] : '';
        if (path && !redirection) {
            if (window.gtag) {
                window.gtag(
                    'config', window.GA_MEASUREMENT_ID, { page_path: window.location.pathname });
            }
            Telemetry.trackPageView({ page: window.location.pathname });
        }
    });

    app.loadCode = function(text) {
        $rootScope.$apply(() => {
            $rootScope.loadedCode = text;
            $location.path('/playground');
        });
    };
    app.shareCode = function(share) {
        localStorage.setItem('_shareCache', JSON.stringify(share));
        $rootScope.$apply(() => {
            $location.path('/playground');
        });
    };
}]);

export default app;
