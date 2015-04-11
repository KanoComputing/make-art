var app = require('../app'),
    session = require('../language/session');

/*
 * Display directive
 *
 * Handles live updatingm execution of code and rendering coming from its model
 */

var firstRender = true;

app.directive('display', function ($window) {
    return {
        require     : '^workspace',
        restrict    : 'E',
        templateUrl : '/directive/display.html',
        scope       : {
            source : '=',
            mode   : '='
        },
        link        : function (scope, element, attrs, workspaceCtl) {
            var win = angular.element($window);

            /*
             * Initialise directive
             *
             * @return void
             */
            function init() {
                scope.canvas = element.find('canvas')[0];
                scope.ctx = scope.canvas.getContext('2d');
                scope.resize();
                scope.$watch('source', scope.update);
            }

            /*
             * Get canvas center
             *
             * @return {Object}
             */
            scope.getCenter = function () {
                return {
                    x : scope.width / 2,
                    y : scope.height / 2
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
            scope.update = function () {
                var language = require('../language/index'),
                    settings = scope,
                    err;

                // Reset error, evaluate code and catch new potentia;errors
                scope.error = null;
                err = language.run(scope.source, settings);

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
            };

            /*
             * Display error caught from the editor
             *
             * @param {Object} err
             * @return void
             */
            function displayEditorError(err) {
                workspaceCtl.scope.error = {
                    row    : err.loc[0],
                    column : err.loc[1],
                    text   : err.message,
                    type   : 'error'
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
             * Set coordinates to display
             *
             * @param {Number} x
             * @param {Number} y
             * @return void
             */
            function setCursorPosition(x, y) {
                scope.cursorPosition = { x: x, y: y };
            }

            /*
             * Display mouse position coordinates
             *
             * @param {Object} $event
             * @return void
             */
            scope.displayMousePos = function ($event) {
                setCursorPosition($event.offsetX, $event.offsetY);
            };

            /*
             * Display cursor position
             *
             * @param {Object} $event
             * @return void
             */
            scope.displayCursorPos = function () {
                setCursorPosition(session.pos.x, session.pos.y);
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

            init();
        }
    };
});