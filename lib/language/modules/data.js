/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    debounceWeather;

function getWeather(city, callback) {
    var queryBegin = 'select item.condition, wind from weather.forecast where woeid in (select woeid from geo.places(1) where text="',
        queryEnd = '")',
        query = encodeURIComponent(queryBegin) + encodeURIComponent(city) + encodeURIComponent(queryEnd),
        env = 'store://datatables.org/alltableswithkeys',
        url = 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json&env=' + encodeURIComponent(env);

    clearTimeout(debounceWeather);
    debounceWeather = setTimeout(function () {
        fetch(url)
        .then(function (r) {
            return r.json();
        })
        .then(function (page) {
            var condition = page.query.results.channel.item.condition,
                wind = page.query.results.channel.wind;
            delete condition.code;
            delete condition.date;
            callback({
                condition: condition,
                wind: wind
            });
        });
    }, 500);
}

module.exports = {
    getWeather: getWeather
};
