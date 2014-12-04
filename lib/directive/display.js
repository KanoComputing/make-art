var app = require('../app');

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
                    settings = scope;

                err = language.run(scope.ngSource, settings);
                if (err) {
                    workspaceCtl.setCustomAnnotations([{
                        row: err.loc[0],
                        column: err.loc[1],
                        text: err.message,
                        type: "error"
                    }]);
                } else {
                    workspaceCtl.clearCustomAnnotations();
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

            var win = angular.element($window);

            win.bind('resize', function () {
                scope.$apply(scope.resize);
            });

            scope.resize();

            scope.$watch('ngSource', scope.update);
        }
    };
});
