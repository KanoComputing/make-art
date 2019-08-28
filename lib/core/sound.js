/*
 * Play sound by given base filename - Fallback onto offline API if running on the Pi
 *
 * @param {String} name
 * @return void
 */
export const play = function (root, name) {
    var soundPath = root + 'assets/sounds/' + name + '.mp3',
        audio;

    audio = document.createElement('audio');

    audio.src = soundPath;
    audio.load();
    audio.play();
};

export default {
    play,
}