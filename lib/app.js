"use strict";
/*
 * Angular app module
 *
 * Define behaviour for app `run` and `config`
 */

var api, auth, cfg, envCfg,
    config = require('./core/config'),
    analytics = require('./core/analytics'),
    app = angular.module('draw', ['ngRoute']),
    domainCfg;

cfg = angular.extend(config.default, config[window.ENV]);

envCfg = {
    API_URL     : cfg.API_URL,
    WORLD_URL   : cfg.WORLD_URL,
    OFFLINE     : cfg.OFFLINE
};

auth = require('./core/auth')(envCfg);
api = require('./api')(envCfg);

window.CONFIG = cfg;
domainCfg = cfg.DOMAIN_CFG;

// Configure app
app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});


// Run app
app.run(function ($rootScope, $window) {
    var win = angular.element($window),
        progressGroups;

    /*
     * Get last visited challenge index
     *
     * @return {Number}
     */
    function getLastChallenge(groupName) {
        return parseInt(localStorage[groupName + 'lastChallengeVisited'] || 1, 10);
    }

    /*
     * Set last visited challenge index
     *
     * @param {Number} index
     * @return void
     */
    function setLastChallenge(groupName, index) {
        if (groupName) {
            localStorage[groupName + 'lastChallengeVisited'] = index;
        }
    }

    /**
     *
     * Redirects to a certain world if
     * it matches the domain
     * e.g. hourofcode.kano.me redirects to challenges/hourofcode
     */
    function redirectIfNeeded() {
        var host = window.location.hostname,
            path = window.location.pathname,
            hashed = (window.location.href.indexOf('#') > -1);


        if (domainCfg[host] && !hashed && path === '/' && domainCfg[host].mapToWorld && path !== domainCfg[host].mapToWorld) {
            window.location.href = '/challenges/' + domainCfg[host].mapToWorld;
        }
    }

    /**
     * Initialises the progress variables
     */
    function initProgress() {

        var lsChallenge = parseInt(localStorage.challenge, 10);
        $rootScope.progress = { groups: {}};
        // Prefill progress from localStorage
        $rootScope.progress.groups = localStorage.groups ? JSON.parse(localStorage.groups) : {};
        progressGroups = $rootScope.progress.groups;
        progressGroups.basic = progressGroups.basic || {challengeNo: 1};


        //backwards compatibility
        if (lsChallenge && progressGroups.basic.challengeNo < lsChallenge) {

            progressGroups.basic.challengeNo = lsChallenge;
        }
    }

    /**
     * Loads the user profile inside the $rootScope
     * @param  {string} userId the UserId
     */
    function loadUserProfile(userId) {
        if (!cfg.OFFLINE) {
            api.profile.getProfile({userId: userId}).then(function (res) {
                var user = (res && res.body) ? res.body.user : undefined;
                if (user) {
                    $rootScope.user.profile = user.profile;
                }
                $rootScope.$broadcast('user-profile-loaded');

            });
        }
    }


    // Define global app initial values

    $rootScope.cfg = cfg;
    $rootScope.api = api;
    $rootScope.offline = cfg.OFFLINE;
    $rootScope.loggedIn = false;
    $rootScope.user = null;
    $rootScope.login = auth.login;
    $rootScope.logout = auth.logout;
    $rootScope.shutdown = api.server.shutdown;
    $rootScope.banner = {
        showModal: false,
        openModal: function () { this.showModal = true; },
        closeModal: function () { this.showModal = false; }
    };

    initProgress();



    // Initialised auth state
    auth.init(function () {
        var userObj, userId;

        $rootScope.loggedIn = auth.getState();
        userObj = auth.getUser();
        $rootScope.user = userObj;

        if (userObj) {
            loadUserProfile(userObj.id);
        }

        $rootScope.$watch('user', function (user) {
            if (user) {
                userId = user.id;
                if (!localStorage.uuid) {
                    localStorage.uuid = userId;
                    loadUserProfile(userId);
                } else {
                    if (localStorage.uuid !== userId) {
                        localStorage.uuid = userId;
                    }
                }
            }
        });

        $rootScope.feedbackLoaded = function () {
            var el = document.querySelector('.kano-feedback-container');
            el.addEventListener('animationend', function () {
                document.querySelector('.kano-feedback-container').classList.remove('fadeInUp');
            });
        };


        // Load progress
        api.progress.load(function (groups) {
            if (groups) {

                //incremental merge of the groups
                Object.keys(groups).forEach(function (group) {
                    var grp_obj = groups[group],
                        rsGroup;

                    $rootScope.progress.groups[group] = $rootScope.progress.groups[group] || {challengeNo: 1};
                    rsGroup = $rootScope.progress.groups[group];
                    Object.keys(grp_obj).forEach(function (key) {
                        //only merge the challengeNo if there's more progress in the API
                        if (key === "challengeNo") {

                            if (!rsGroup.challengeNo || (rsGroup.challengeNo && rsGroup.challengeNo < grp_obj.challengeNo)) {
                                rsGroup.challengeNo = grp_obj.challengeNo;
                            }

                        } else {
                            rsGroup[key] = grp_obj[key];
                        }
                    });

                });
            }
            $rootScope.$apply();
            redirectIfNeeded();

        });

    });


    // Initialise analytics
    analytics.init();


    /*
     * Attach lastChallengeVisited get / set object to $rootScope
     */
    $rootScope.lastChallengeVisited = {
        get : getLastChallenge,
        set : setLastChallenge
    };

    /*
     * Update progress
     * @param {string} worldId the id of the world
     * @param {Number} challengeNo the new challenge
     * @return void
     */
    $rootScope.updateProgress = function (worldId, challengeNo) {
        if (worldId) {
            api.progress.save(challengeNo, worldId, function (xpGain) {
                $rootScope.xpGain = xpGain;
                $rootScope.$apply();
            });
            $rootScope.progress.groups = $rootScope.progress.groups || {};
            $rootScope.progress.groups[worldId] = $rootScope.progress.groups[worldId] || {};
            $rootScope.progress.groups[worldId].challengeNo = challengeNo;
        } else {
            $rootScope.xpGain = 0;
            $rootScope.$apply();
        }
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
        $rootScope.basePath = path ? path.split('/')[1] : '';
        analytics.page(path);
    });
});

module.exports = app;
