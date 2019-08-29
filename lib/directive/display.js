"use strict";
import i18n from '../i18n.js';
import app from '../app.js';
import session from '../language/session.js';
import fileUtil from '../util/file.js';
import { throttle } from '../util/throttle.js';
var firstRender = true, THROTTLE_MS, VALIDATE_DELAY, config;

import language from '../language/index.js';

/*
 * Display directive
 *
 * Handles live updatingm execution of code and rendering coming from its model
 */


app.directive('display', ['$window', '$rootScope', '_config', function ($window, $rootScope, _config) {
    config = $rootScope.cfg;
    THROTTLE_MS = config.OFFLINE ? 1000 : 1;
    VALIDATE_DELAY = config.OFFLINE ? 1000 : 1;

    return {
        require: '^workspace',
        restrict: 'E',
        templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/directive/display.html',
        scope: {
            source: '=',
            mode: '=',
            sharing: '=',
            resetFn: '='
        },
        link: function (scope, element, ctrl, workspaceCtl) {

            var timer, win = angular.element($window),
                loadInput = element.find('input')[0];

            // Attach workspace to scope
            scope.workspace = workspaceCtl || null;
            /*
             * Initialise directive
             *
             * @return void
             */
            function init() {
                loadInput.onchange = scope.loadFile;
                scope.canvas = element.find('canvas')[0];
                scope.ctx = scope.canvas.getContext('2d');
                scope.resize();
                scope.$watch('source', scope.update);


                if (scope.workspace && scope.workspace.scope._shareCache) {
                    scope.setOpenModal('share');
                }
            }

            /*
             * Set editor's code to given value
             *
             * @param {String} code
             * @return {Object}
             */
            scope.setCode = function (val) {
                // Next tick..
                setTimeout(function () {
                    scope.workspace.scope.editor.ngModel = val;
                    scope.workspace.scope.editor.$apply();
                });
            };

            /*
             * Reset editor's code and run `resetFn` if assigned to scope
             *
             * @return {Object}
             */
            scope.resetCode = function () {
                scope.setCode('');

                if (typeof scope.resetFn === 'function') {
                    scope.resetFn();
                }
            };

            /*
             * Get canvas center
             *
             * @return {Object}
             */
            scope.getCenter = function () {
                return {
                    x: scope.width / 2,
                    y: scope.height / 2
                };
            };

            /*
             * Set open modal id
             *
             * @param {String} modalId
             * @return void
             */
            scope.setOpenModal = function (modalId) {
                scope.openModal = modalId;
            };

            /*
             * Update render evaluating code
             *
             * @return void
             */
            scope.update = throttle(function () {
                var settings = scope,
                    err;

                if (config.OFFLINE) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    scope.$apply(() => {
                        // Reset error, evaluate code and catch new potentia;errors
                        scope.error = null;
                        err = language.run(scope.source, settings);
                        scope.cursorPosition = language.cursorPosition() || scope.getCenter();
                        scope.displayCoordsPos();

                        if (err) {
                            // Drawing failed
                            scope.drawingFailed = true;

                            if ('loc' in err) {
                                displayEditorError(err);
                            }
                        } else {
                            // Drawing succeded
                            scope.drawingFailed = false;
                            workspaceCtl.scope.error = null;
                        }
                    });
                }, VALIDATE_DELAY);
            }, THROTTLE_MS, false);

            /*
             * Display error caught from the editor
             *
             * @param {Object} err
             * @return void
             */
            function displayEditorError(err) {
                workspaceCtl.scope.error = {
                    row: err.loc ? err.loc[0] : null,
                    column: err.loc ? err.loc[1] : null,
                    text: err.message,
                    type: err.type
                };
            }

            /*
             * Page resize callback - re-render the drawing with new size
             *
             * @return void
             */
            scope.resize = function () {
                scope.ratio = window.devicePixelRatio || 1;

                scope.width = scope.canvas.offsetWidth;
                scope.height = scope.canvas.offsetHeight;

                scope.canvas.width = scope.width * scope.ratio;
                scope.canvas.height = scope.height * scope.ratio;

                scope.update();
            };

            /*
             * Handle and display errors from the editor
             *
             * @param {Error} error
             * @return void
             */
            workspaceCtl.setErrorCallback(function (error) {
                if (scope.drawingFailed && error) {
                    scope.error = error;

                    // Quirk: Apply scope in next tick
                    setTimeout(function () {
                        scope.$apply();
                    });
                }
            });

            /*
             * Set coordinates to display, round decimal places to 2.
             *
             * @param {Number} x
             * @param {Number} y
             * @return void
             */
            function setCoordsPosition(x, y) {
                x = x % 1 === 0 ? x : Number(x.toFixed(2));
                y = y % 1 === 0 ? y : Number(y.toFixed(2));
                scope.coordsPosition = { x: x, y: y };
            }

            /*
             * Display mouse position coordinates
             *
             * @param {Object} $event
             * @return void
             */
            scope.displayMousePos = function ($event) {
                setCoordsPosition($event.offsetX, $event.offsetY);
                scope.mouse = true;
            };

            /*
             * Display cursor position
             *
             * @param {Object} $event
             * @return void
             */
            scope.displayCoordsPos = function () {
                if (session.pos) {
                    setCoordsPosition(session.pos.x, session.pos.y);
                }
                scope.mouse = false;
            };

            // Bind resize event
            win.bind('resize', function () {
                scope.$apply(scope.resize);
            });

            /*
             * HACK:
             * Sometimes brakes when rendering text before fonts are loaded,
             * and window.onload doesn't trigger anymore - so this is a
             * temporary workaround
            */
            if (firstRender) {
                setTimeout(scope.update.bind(this), 1000);
                firstRender = false;
            }

            /*
             * Load data locally from file input
             *
             * @return void
             */
            scope.loadFile = function () {
                var file = loadInput.files[0],
                    reader = new FileReader();

                reader.onload = function (evt) {
                    var fileData = evt.target.result;

                    scope.setCode(fileData);
                };

                reader.readAsText(file);
            };

            /*
             * Open save dialog if offline, otherwise download current code blob
             *
             * @return void
             */
            scope.save = function () {
                var blob;

                blob = new Blob([scope.source], { type: 'text/plain' });

                fileUtil.downloadBlob(blob, 'creation.draw');

                $rootScope.gamification.trigger({ name: 'make-art-code-written', detail: { count: scope.source.split('\n').length } });
            };

            init();
        },
    };
}]);
