/*
 * String filters
 *
 * Registers string template filters to angular app
 */

import app from '../app';

/*
 * Pads input number to reach given number of digits
 *
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

/* Ordinal numbers */
app.filter('ordinal', function () {
	return function (value) {
		var suffix = 'th';
		var mapping = {
			'1': 'st',
			'2': 'nd',
			'3': 'rd',
			'21': 'st',
			'22': 'nd',
			'23': 'rd',
			'31': 'st'
		};
		suffix = mapping[value] || suffix;

		return value + suffix;
	};
});