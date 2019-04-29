import api from './local-api.js';

function playSound(filename) {
	api.sound.play({ filename: filename });
}

export default {
    playSound : playSound
};