/*
 * String filters
 *
 * Registers string template filters to angular app
 */

var app = require('../app');

/*
 * Pads input number to reach given number of digits
 *
 * @param {Number} value
 * @return {String}
 */
app.filter('upperfirst', function () {
    return function (str) {
        return str ? str.substr(0, 1).toUpperCase() + str.substr(1) : '';
    };
});