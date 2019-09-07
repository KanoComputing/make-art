
import app from '../app.js';
import notify from '../api/notify.js';

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.src = src;
        document.head.appendChild(script);
    });
}

/*
 * Share modal directive
 *
 * Share modal directive under display
 */

app.directive('exportModal', ['$rootScope', '$routeParams', '_config', ($rootScope, $routeParams, _config) => {
    return {
        restrict: 'E',
        template: '<div ng-show="open" id="sharing-container" class="modal-overlay export-menu"></div>',
        scope: {
            display: '=',
            action: '='
        },
        link: function (scope, element) {
            // Setup scope
            scope.open = false;
            scope.meta = {};
            scope.loading = false;
            scope.loggedIn = $rootScope.user ? true : false,
                scope.optional = ($rootScope.selectedWorld ? ($rootScope.selectedWorld.share_strategy === 'optional') : '');
            $rootScope.successful = false;
            $rootScope.creation = null;

            // Initialise
            init();
            bind();

            function init() {
                var _shareCache;

                // Next tick..
                setTimeout(function () {
                    if (scope.display.workspace && scope.display.workspace.scope._shareCache) {
                        _shareCache = scope.display.workspace.scope._shareCache;
                        scope.meta.title = _shareCache.title;
                        scope.meta.description = _shareCache.description;
                    }
                });
            }

            $rootScope.$watch('exportModal', function (val) {
                if (val) {
                    if (scope.display.mode === 'challenge') {
                        scope.display.setOpenModal('share');
                    }
                }
            });

            scope.skipSharing = function () {
                scope.close();
                $rootScope.openNextModal();
            };

            let integrationLoaded = false;

            function getIntegration() {
                if (integrationLoaded) {
                    return Promise.resolve();
                }
                return loadScript(`${_config.SHARING_URL}/integration.js`)
                    .then(() => {
                        integrationLoaded = true;
                    })
            }

            /*
             * Open modal, load parent display's source and canvas
             *
             * @return void
             */

            function open() {
                if (!$rootScope.user) {
                    $rootScope.auth.openModal('login');
                    scope.loading = false;
                    $rootScope.postAuthAction = () => open();
                    return;
                }

                if (('consent' in $rootScope.user.attributes) && !$rootScope.user.attributes.consent) {
                    notify.message('Ask your parents to check their email. \nCurrently, you cannot publish your creations.', 'fail');
                    scope.close();
                    return;
                }

                scope.open = true;
                
                getIntegration()
                .then(() => {
                    const ui = window.KanoSharing.createUI(_config.SHARING_URL, _config.ENV);
                    const node = ui.getDomNode();
                    node.style.border = '0';
                    node.style.margin = '0';
                    node.style.width = '820px';
                    node.style.height = '392px';
                    element.find('div').append(node);

                    ui.share({
                        userToken: $rootScope.api.session.getSession().token,
                        title: scope.meta.title,
                        app: 'kano-draw',
                        coverUrl: getImageURL(),
                        attachmentKey: 'attachment',
                        attachmentType: 'draw',
                        attachmentUrl: `data:application/x-kano-draw;base64,${btoa(scope.display.source)}`,
                        hardware: [],
                        parent: $routeParams.id,
                    }).then(() => {
                        scope.$apply(() => {
                            scope.close();
                        });
                        ui.dispose();
                        $rootScope.gamification.trigger({ name: 'make-art-code-written', detail: { count: scope.display.source.split('\n').length } });
                    });
                });
            }

            /*
             * Close modal
             *
             * @return void
             */
            scope.close = function () {
                scope.open = false;
                scope.display.openModal = null;
                $rootScope.exportModal = false;
            };

            /*
             * Get image data URL
             *
             * @return {String}
             */
            function getImageURL() {
                return scope.display.canvas.toDataURL('image/png');
            }

            /*
             * Listen to parent display's state changes and DOM events
             *
             * @return void
             */
            function bind() {

                // Open or close on parent display modal state change
                scope.display.$watch('openModal', function (modalId) {
                    if (modalId === scope.action && !scope.open) {
                        open();
                    } else if (scope.open) {
                        scope.close();
                    }
                });
                // Listen for keydown events, close when ESC is pressed
                window.addEventListener('keydown', function (e) {
                    if (e.keyCode === 27) { // ESC
                        scope.display.setOpenModal(null);
                        scope.close();
                        scope.$apply();
                    }
                });

            }
        },
    };
}]);
