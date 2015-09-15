var play = require('play-audio'),
    api,
    config = window.CONFIG;

var cfg = {
	WORLD_URL: config.WORLD_URL,
	API_URL: config.API_URL,
	OFFLINE: config.OFFLINE
};

api = require('../api')(cfg);

/*
 * Play sound by given base filename - Fallback onto offline API if running on the Pi
 *
 * @param {String} name
 * @return void
 */
exports.play = function (name) {

    //Pi is not compatible with HTML5 audio object
    if (config.OFFLINE) {
        api.sound.playSound('assets/sounds/' + name + '.mp3');
    } else {
        play('/assets/sounds/' + name + '.mp3').play();  
    }

};