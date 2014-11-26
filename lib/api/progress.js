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

}

module.exports = {
    save: save,
    load: load,
};
