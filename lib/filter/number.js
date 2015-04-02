/*
 * String filters
 *
 * Registers string template filters to angular app
 */

var app = require('../app');

/*
 * Pads input number to reach given number of digits
 * @param {Number} value
 * @return {String}
 */
app.filter('zeropad', function () {
    return function (value, length) {
        var str = value + '';

        length = length || 2;

        while (str.length < length) {
            str = '0' + str;
        }

        return str;
    };
});