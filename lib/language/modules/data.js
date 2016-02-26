/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    debounce;

function getWeather(city, callback) {
    key = 'temperature';
    var keyMap = {
        temperature: 'temp',
        condition: 'text'
    },
        queryBegin = 'select item.condition, wind from weather.forecast where woeid in (select woeid from geo.places(1) where text="',
        queryEnd = '")',
        query = encodeURIComponent(queryBegin) + encodeURIComponent(city) + encodeURIComponent(queryEnd),
        env = 'store://datatables.org/alltableswithkeys',
        url = 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json&env=' + encodeURIComponent(env);

    clearTimeout(debounce);
    debounce = setTimeout(function () {
        fetch(url)
        .then(function (r) {
            return r.json();
        })
        .then(function (page) {
            var condition = page.query.results.channel.item.condition,
                wind = page.query.results.channel.wind;
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
