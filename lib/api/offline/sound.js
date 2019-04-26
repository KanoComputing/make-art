import api from './local-api';

function playSound(filename) {
	api.sound.play({ filename: filename });
}

export default {
    playSound : playSound
};