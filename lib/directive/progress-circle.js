import i18n from '../i18n';
import app from '../app';

var XMLNS = 'http://www.w3.org/2000/svg',
    RADIUS = 30,
    THICKNESS = 10;

/*
 * Progress circle directive
 *
 * Display progress in an SVG circle
 */

app.directive('progressCircle', function () {
    return {
        restrict    : 'E',
        templateUrl : i18n.getHtmlLocalePath() + '/directive/progress-circle.html',
        scope       : {
            value : '=',
            max   : '='
        },
        link        : function (scope, el) {
            var svg, wrap, circle;

            // Add main SVG element
            svg = document.createElementNS(XMLNS, 'svg');
            el[0].appendChild(svg);

            // Add background wrap circle
            wrap = document.createElementNS(XMLNS, 'circle');
            wrap.setAttributeNS(null, 'cx', RADIUS);
            wrap.setAttributeNS(null, 'cy', RADIUS);
            wrap.setAttributeNS(null, 'r', RADIUS - THICKNESS);
            svg.appendChild(wrap);

            // Add progress path
            circle = document.createElementNS(XMLNS, 'path');
            svg.appendChild(circle);

            // Bind to scope changes
            scope.$watch('value', update);
            scope.$watch('max', update);

            /*
             * Update progress
             *
             * @return void
             */
            function update() {
                circle.setAttributeNS(null, 'd', getArcPath());
            }

            /*
             * Convert degrees to radians
             *
             * @param {Number} deg
             * @return {Number}
             */
            function degToRad(deg) {
                return deg * (Math.PI / 180);
            }

            /*
             * Get bar path string
             *
             * @return {String}
             */
            function getArcPath() {
                var angle = (scope.value * 359) / scope.max,
                    start = degToRad(90),
                    end = degToRad(90 - angle);

                return createSvgArc(RADIUS, RADIUS, RADIUS - THICKNESS, start, end);
            }

            /*
             * Generate arc SVG path value
             *
             * @param {Number} x
             * @param {Number} y
             * @param {Number} r
             * @param {Number} startAngle
             * @param {Number} endAngle
             * @return {String}
             */
            function createSvgArc(x, y, r, startAngle, endAngle) {
                var s;

                if (startAngle > endAngle){
                    s = startAngle;
                    startAngle = endAngle;
                    endAngle = s;
                }

                if (endAngle - startAngle > Math.PI * 2) {
                    endAngle = Math.PI * 1.99999;
                }

                var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

                return [
                    'M', x, y,
                    'M', x + Math.cos(startAngle) * r, y - (Math.sin(startAngle) * r), 
                    'A', r, r, 0, largeArc, 0, x + Math.cos(endAngle) * r, y - (Math.sin(endAngle) * r),
                    ].join(' ');
            }
        }
    };
});
