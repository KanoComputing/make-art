var sdk = require('kano-world-sdk');

function save(level, callback) {
    localStorage.level = level;

    if (sdk.auth.getUser()) {
        sdk.appStorage.set('kano-draw', { level: level }, function () {
            callback(0);
        });
    } else {
        callback(0);
    }
}

function load(callback) {
    var level = 0;

    if (localStorage.level) {
        level = parseInt(localStorage.level, 10);
    }

    if (sdk.auth.getUser()) {
        sdk.appStorage.get('kano-draw', function (err, data) {
            if (data && data.level && data.level > level) {
                level = data.level;
            }

            callback(level);
        });
    } else {
        callback(level);
    }
}

module.exports = {
    save : save,
    load : load
};
