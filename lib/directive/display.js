var app = require('../app'),
    session = require('../language/session');

app.directive('display', function ($window) {
    return {
        require     : '^workspace',
        restrict    : 'E',
        templateUrl : '/directive/display.html',
        scope       : { ngSource: '=' },
        link        : function (scope, element, attrs, workspaceCtl) {
            scope.canvas = element.find('canvas')[0];
            scope.ctx = scope.canvas.getContext('2d');

            scope.getCenter = function () {
                return {
                    x : scope.width / 2,
                    y : scope.height / 2
                };
            };

            scope.update = function () {
                var language = require('../language/index'),
                    settings = scope,
                    err;

                scope.error = null;
                err = language.run(scope.ngSource, settings);

                if (err) {
                    scope.drawingFailed = true;

                    if ('loc' in err) {
                        workspaceCtl.scope.error = {
                            row: err.loc[0],
                            column: err.loc[1],
                            text: err.message,
                            type: 'error'
                        };
                    }
                } else {
                    scope.drawingFailed = false;
                    workspaceCtl.scope.error = null;
                }
            };

            scope.resize = function () {
                scope.ratio = window.devicePixelRatio || 1;

                scope.width = scope.canvas.offsetWidth;
                scope.height = scope.canvas.offsetHeight;

                scope.canvas.width = scope.width * scope.ratio;
                scope.canvas.height = scope.height * scope.ratio;

                scope.update();
            };

            workspaceCtl.setErrorCallback(function (error) {
                if (scope.drawingFailed && error) {
                    scope.error = error;

                    // Quirk: Apply scope in next tick
                    setTimeout(function () {
                        scope.$apply();
                    });
                }
            });

            var setPositionDisplay = (function() {
                var x_pos = element[0].querySelector('.x-pos .pos-value'),
                    y_pos = element[0].querySelector('.y-pos .pos-value');

                return function(x, y) {
                    x_pos.innerHTML = x;
                    y_pos.innerHTML = y;
                };
            })();

            scope.displayMousePos = function($event) {
                setPositionDisplay($event.offsetX, $event.offsetY);
            };

            scope.displayCursorPos = function() {
                setPositionDisplay(session.pos.x, session.pos.y);
            };

            var win = angular.element($window);

            win.bind('resize', function () {
                scope.$apply(scope.resize);
            });

            scope.resize();

            scope.$watch('ngSource', scope.update);
        }
    };
});
