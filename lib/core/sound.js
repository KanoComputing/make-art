var play = require('play-audio'),
    api = require('../api'),
    config = require('./config');

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