import api from './local-api.js';

function playSound(filename) {
    console.log('sound.js offline => 1')
	api.sound.play({ filename: filename });
}

export default {
    playSound : playSound
};