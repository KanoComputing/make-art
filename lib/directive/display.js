var app = require('../app');

function showError(canvas, ctx, error) {
    var x,
        y = (1 - 0.618)*canvas.height,
        width,
        heading;

    /* Fill the canvas red */
    ctx.beginPath();
    ctx.fillStyle ='#e95c5a';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    ctx.fillStyle ='#fff';

    heading = 'Error on line ' + (error.row+1) + ':';
    ctx.font = 'bold 30px Bariol';
    width = ctx.measureText(heading).width;
    x = (canvas.width - width) / 2;
    ctx.fillText(heading, x, y);

    ctx.font = '20px Bariol';
    width = ctx.measureText(error.text).width;
    x = (canvas.width - width) / 2;
    ctx.fillText(error.text, x, y + 40);
}

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
                    scope.drawingFailed = true;
                    if ('loc' in err) {
                        workspaceCtl.setCustomAnnotations([{
                            row: err.loc[0],
                            column: err.loc[1],
                            text: err.message,
                            type: "error"
                        }]);
                    }
                } else {
                    scope.drawingFailed = false;
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

            workspaceCtl.setErrorCallback(function (error) {
                if (scope.drawingFailed && error) {
                    showError(scope.canvas, scope.ctx, error);
                }
            });

            var win = angular.element($window);

            win.bind('resize', function () {
                scope.$apply(scope.resize);
            });

            scope.resize();

            scope.$watch('ngSource', scope.update);
        }
    };
});
