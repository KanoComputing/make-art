var api = require('./local-api'),
    notify = require('./notify');

function save(progress) {
    api.progress.save({ progress: progress })
    .then(notify.success, notify.failure);
}

function load(callback) {
    api.progress.load()
    .then(function (res) {
        callback(res.body);
    }, notify.failure);
}

module.exports = {
    save : save,
    load : load
};
