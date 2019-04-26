import BaseHandler from './BaseHandler';

/*
 * NumberHandler class
 *
 * Displays a handle to regulate the number value
 */

var SLIDER_WIDTH = 200,
    SLIDER_MAX = 600,
    template =
        '<div class="slider" ng-style="{ width: width + \'px\' }">' +
            '<span class="handle" ng-style="{ left: x + \'px\' }"></span>' +
        '</span>';

/*
 * NumberHandler constructor
 *
 * @class ColorHandler
 * @extends BaseHandler
 * @contructor
 */
function NumberHandler() {
    this.template = template;
    this.class = 'token-handler-number';
    this.min = 0;
    this.max = SLIDER_MAX;
    BaseHandler.apply(this, arguments); // Call super
}

// Extend from BaseHandler
NumberHandler.prototype = Object.create(BaseHandler.prototype);

/*
 * Initialise handler
 *
 * @return void
 */
NumberHandler.prototype.init = function () {
    BaseHandler.prototype.init.apply(this); // Call super

    var scope = this.scope,
        handle = this.el.querySelector('.handle'),
        slider = this.el.querySelector('.slider'),
        origin = (SLIDER_WIDTH * this.token.value) / SLIDER_MAX,
        body = angular.element(document.body),
        dragStart, dragging, offset;

    scope.width = SLIDER_WIDTH;
    scope.x = origin;

    // Update token value on slider position changes
    scope.$watch('x', function () {
        scope.value = Math.floor((scope.x * SLIDER_MAX) / SLIDER_WIDTH);
    });

    // Start dragging on `mousedown` event
    handle.addEventListener('mousedown', function (e) {
        dragStart = e.pageX;
        dragging = true;
        body.addClass('dragging');
    });

    // Stop dragging on `mouseup` event
    window.addEventListener('mouseup', function () {
        if (!dragging) { return; }

        body.removeClass('dragging');
        dragging = false;
        origin = scope.x;
        scope.$apply();
    });

    // Update `x` value on `mousemove` event if dragging
    window.addEventListener('mousemove', function (e) {
        if (!dragging) { return; }

        offset = e.pageX - dragStart;

        if (offset > SLIDER_WIDTH - origin) {
            offset = SLIDER_WIDTH - origin;
        } else if (offset < -origin) {
            offset = -origin;
        }

        scope.x = origin + offset;
        scope.$apply();
    });

    // Change value on `click` event on the slider bar
    this.el.addEventListener('click', function (e) {
        var bbox = slider.getBoundingClientRect(),
            pos = e.pageX - bbox.left;

        origin = scope.x;
        offset = pos - origin;
        scope.x = origin = origin + offset;

        scope.$apply();
    });
};

export default NumberHandler;