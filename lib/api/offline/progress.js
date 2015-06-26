var api = require('./local-api'),
    notify = require('../notify'),
    onlineProgress = require('../online/progress');

function save(progress, callback) {
    api.progress.save({ progress: progress })
    .then(function(res) {
        var xpGain = res.body;

        callback(xpGain);
    }, notify.failure);
}

function load(callback) {
    api.progress.load()
    .then(function (res) {
        callback(res.body);
    }, notify.failure);
}

module.exports = {
    save             : save,
    load             : load,
    trackLinesOfCode : onlineProgress.trackLinesOfCode
};
