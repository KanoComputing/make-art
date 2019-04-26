var apiFactory = require('../api');

var api,
    config = window.CONFIG;

var cfg = {
	WORLD_URL: config.WORLD_URL,
	API_URL: config.API_URL,
	API_URL_V2: config.API_URL_V2,
	OFFLINE: config.OFFLINE
};

api = apiFactory(cfg);

/*
 * Play sound by given base filename - Fallback onto offline API if running on the Pi
 *
 * @param {String} name
 * @return void
 */
exports.play = function (name) {
    var soundPath = 'assets/sounds/' + name + '.mp3',
        audio;

    //Pi is not compatible with HTML5 audio object
    if (config.OFFLINE) {
        api.sound.playSound(soundPath);
    } else {
        audio = document.createElement('audio');

        audio.src = '/' + soundPath;
        audio.load();
        audio.play();
    }

};
