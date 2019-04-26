var BaseHandler = require('./BaseHandler'),
    palette = require('../../language/modules/palette');

/*
 * ColorHandler class
 *
 * Shows a palette providing on-brand color choices when numbers are highlighted
 */

var PALETTE_COLORS = [
        [ 'yellow', 'orange', 'red', 'orangered', 'darkred' ],
        [ 'green', 'aquamarine', 'lightblue', 'aqua', 'blue' ],
        [ 'lightbrown', 'brown', 'purple', 'darkpurple', 'darkblue' ],
        [ 'white', 'lightgray', 'darkgray', 'dimgray', 'black' ]
    ],
    template =
        '<div class="palette">' +
            '<div class="palette-row" ng-repeat="row in colors">' +
                '<span ng-repeat="color in row" class="color" ng-style="{ background: palette[color] }" ng-click="setColor(color)"></span>' +
            '</div>' +
        '</div>';

/*
 * ColorHandler constructor
 *
 * @class ColorHandler
 * @extends BaseHandler
 * @contructor
 */
function ColorHandler() {
    this.template = template;
    this.class = 'token-handler-color';
    BaseHandler.apply(this, arguments); // Call super
}

// Extend from BaseHandler
ColorHandler.prototype = Object.create(BaseHandler.prototype);

/*
 * Initialise handler
 *
 * @return void
 */
ColorHandler.prototype.init = function () {
    BaseHandler.prototype.init.apply(this); // Call super

    var scope = this.scope;

    scope.colors = PALETTE_COLORS;
    scope.palette = palette;

    // Change the token value
    scope.setColor = function (color) {
        scope.value = color;
    };
};

module.exports = ColorHandler;
