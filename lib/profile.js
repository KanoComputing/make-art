/* global backend */

function loadProgress() {
    var progress;

    backend.call('_load_level', function(level) {
        progress = level;
    });

    return progress;
}

function saveProgress(progress) {
    var xp_diff;

    backend.call('_save_level', progress, function(_xp_diff) {
        xp_diff = _xp_diff;
    });

    return xp_diff;
}

module.exports = {
    loadProgress : loadProgress,
    saveProgress : saveProgress
};
