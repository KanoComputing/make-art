var app = require('../app');

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