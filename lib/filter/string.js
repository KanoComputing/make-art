/*
 * String filters
 *
 * Registers string template filters to angular app
 */

var app = require('../app');

/*
 * Converts the first letter of a string to uppercase
 *
 * @param {String} str
 * @return {String}
 */
app.filter('upperfirst', function () {
    return function (str) {
        return str ? str.substr(0, 1).toUpperCase() + str.substr(1) : '';
    };
});