/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    interval;

function getWeather(city, key) {
    key = key || 'temperature';
    var keyMap = {
        temperature: 'temp',
        condition: 'text'
    },
        queryBegin = 'select item.condition.' + keyMap[key] + ' from weather.forecast where woeid in (select woeid from geo.places(1) where text="',
        queryEnd = '")',
        query = encodeURIComponent(queryBegin) + encodeURIComponent(city) + encodeURIComponent(queryEnd),
        env = 'store://datatables.org/alltableswithkeys',
        url = 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json&env=' + encodeURIComponent(env);
    clearInterval(interval);
    function get() {
        fetch(url)
        .then(function (r) {
            return r.json();
        })
        .then(function (page) {
            window.weather = page.query.results.channel.item.condition[keyMap[key]];
        })
    }
    interval = setInterval(get, 2000);
    get();
    return window.weather;
}

module.exports = {
    getWeather: getWeather
};
