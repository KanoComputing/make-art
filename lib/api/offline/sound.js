var api = require('./local-api');

function playSound(filename) {
	api.sound.play({ filename: filename });
}

module.exports = {
    playSound : playSound
};