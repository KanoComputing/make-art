"use strict";
var api,
    i18n = require('../i18n'),
    app = require('../app'),
    tracking = require ('../core/tracking'),
    WALLPAPER_RATIOS = {
        '1024': {
            width  : 1024,
            height : 768
        },
        '4-3': {
            width  : 1600,
            height : 1200
        },
        '16-9': {
            width  : 1920,
            height : 1080
        }
    };

/*
 * Share modal directive
 *
 * Share modal directive under display
 */

app.directive('exportModal', function ($rootScope, $routeParams) {
    return {
        restrict    : 'E',
        templateUrl : i18n.getHtmlLocalePath() + '/directive/export-modal.html',
        scope       : {
            display : '=',
            action  : '='
        },
        link        : function (scope) {

            // Setup api
            api = $rootScope.api;

            // Setup scope
            scope.open = false;
            scope.meta = {};
            scope.loading = false;
            scope.loggedIn = $rootScope.loggedIn ? true : false,
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

            /*
             * Submit form
             *
             * @return void
             */
            scope.submit = function () {
                if (!scope.meta.title) {
                    return showError('Please choose a title');
                } else if (scope.meta.title.length > 100) {
                    return showError('Title is too long');
                } else if (scope.meta.description &&
                           scope.meta.description.length > 500) {
                    return showError('Description is too long');
                }

                resetError();
                performAction();
            };

            /*
             * Perform modal export action
             *
             * @return void
             */
            function performAction() {
                if (scope.action === 'share') {
                    scope.loading = true;
                    share();
                } else if (scope.action === 'save') {
                    save();
                }
            }

            /*
             * Show an error message
             *
             * @return void
             */
            function showError(err) {
                scope.error = err;
            }

            /*
             * Remove displayed error message
             *
             * @return void
             */
            function resetError() {
                scope.error = null;
            }

            /*
             * Open modal, load parent display's source and canvas
             *
             * @return void
             */

            function open() {
                scope.meta.title = '';
                scope.meta.description = '';
                scope.open = true;
                scope.source = scope.display.source;
                scope.canvas = scope.display.canvas;
                scope.imageURL = getImageURL();
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
                return scope.canvas.toDataURL('image/png');
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

                // Reset error on title change
                scope.$watch('title', function () {
                    resetError();
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

            /*
             * Share creation on Kano World
             *
             * @return void
             */
            function share() {
                var creation,
                    options,
                    title = scope.meta.title || '',
                    code = scope.display.source,
                    description = scope.meta.description || '',
                    challengeId = $routeParams.id,
                    world = $routeParams.world;

                if (!$rootScope.loggedIn) {

                    // Store current details and prompt login if not currently logged in
                    options = {
                        title       : title,
                        code        : code,
                        description : description,
                        challengeId : challengeId
                    };

                    localStorage._shareCache = JSON.stringify(options);

                    $rootScope.auth.openModal();
                    scope.loading = false;
                    return;
                }

                api.progress.trackLinesOfCode(code.split('\n').length);
                api.challengeIO.share(title, code, description, scope.imageURL, world, challengeId, function (data) {
                    if (data.body === '') {
                        scope.loading = false;
                        $rootScope.successful = true;
                        scope.close();
                    } else if (data.body.item) {
                        scope.loading = false;
                        creation = data.body.item;
                        creation.world = $rootScope.selectedWorld ? $rootScope.selectedWorld.name : null;
                        creation.username = $rootScope.user.username;
                        creation.url = $rootScope.cfg.WORLD_URL + "/shared/" + creation.slug;
                        $rootScope.creation = creation;
                        $rootScope.successful = true;
                        scope.close();
                    } else if (data.body && !data.body.item) {
                        scope.loading = false;
                        $rootScope.successful = true;
                        scope.close();
                    }
                    tracking.dispatchTrackingEvent('worldInternalShare');
                    $rootScope.$apply();
                });
            }

            /*
             * Save creation locally
             *
             * @return void
             */
            function save() {
                api.challengeIO.save(
                    scope.meta.title,
                    scope.display.source,
                    scope.meta.description,
                    getImageURL()
                    );

                scope.close();
            }

            /*
             * Export images
             *
             * @return void
             */
            scope.exportWallpaper = function () {
                var wallpapers = getWallpapers();

                api.challengeIO.saveWallpaper(
                    scope.meta.title,
                    wallpapers['1024'],
                    wallpapers['4-3'],
                    wallpapers['16-9']);

                scope.close();
            };

            /*
             * Generate wallpapers from current canvas
             *
             * @return void
             */
            function getWallpapers() {
                var ratio,
                    setCanvas,
                    canvas = scope.display.canvas,
                    original = {
                        width  : canvas.width,
                        height : canvas.height
                    },
                    tempCanvas = document.createElement('canvas'),
                    tempCtx = tempCanvas.getContext('2d'),
                    wallpapers = {};

                setCanvas = function (size) {
                    var scaleFactor = Math.min(
                            size.width / original.width,
                            size.height / original.height
                        ),
                        offset = {
                            x : (size.width / scaleFactor - original.width) / 2,
                            y : (size.height / scaleFactor - original.height) / 2
                        };

                    tempCanvas.width = size.width;
                    tempCanvas.height = size.height;

                    tempCtx.scale(scaleFactor, scaleFactor);

                    // toDataURL() retains alpha, so paint a white bg
                    tempCtx.rect(0, 0, size.width, size.height);
                    tempCtx.fillStyle = 'white';
                    tempCtx.fill();

                    tempCtx.drawImage(canvas, offset.x, offset.y);
                };

                for (ratio in WALLPAPER_RATIOS) {
                    if (WALLPAPER_RATIOS.hasOwnProperty(ratio)) {
                        setCanvas(WALLPAPER_RATIOS[ratio]);
                        wallpapers[ratio] = tempCanvas.toDataURL('image/png');
                    }
                }

                return wallpapers;
            }
        }
    };
});
