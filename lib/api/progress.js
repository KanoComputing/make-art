var api = require('./draw-api'),
    notify = require('./notify');

function save(progress) {
    api.progress.save({ progress: progress })
        .then(notify.success, notify.failure);
}

function load(cb) {
    api.progress.load()
        .then(function (res) {
            var progress = res.body;
            cb(progress);
        }, notify.failure);
}

function lockLevels(progress) {
    var levelButtons = document.querySelectorAll('.levels-menu ul.levels-list li .button');

    for (var i = progress, len = levelButtons.length; i < len; i++) {
        levelButtons[i].classList.add('locked');
        levelButtons[i].href = '';
    }
}

module.exports = {
    save: save,
    load: load,
    lockLevels: lockLevels
};
