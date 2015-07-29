var sdk = require('kano-world-sdk');

function save(challengeNo, groupName, callback) {
    var data = { groups: {} };

    if (groupName) {
        data.groups[groupName] = {};
        data.groups[groupName].challengeNo = challengeNo;
        localStorage.groups = data.groups;
    }
    else {
        data.challenge = challengeNo;
        localStorage.challenge = challengeNo;
    }

    if (sdk.auth.getUser()) {
        sdk.appStorage.set('kano-draw', data, function () {
            callback(0);
        });
    } else {
        callback(0);
    }
}

function load(callback) {
    var challenge = 0;

    if (localStorage.challenge) {
        challenge = parseInt(localStorage.challenge, 10);
    }

    if (sdk.auth.getUser()) {
        sdk.appStorage.get('kano-draw', function (err, data) {
            if (data && data.challenge && data.challenge > challenge) {
                challenge = data.challenge;
            }
            callback(challenge, data.groups);
        });
    } else {
        callback(challenge, localStorage.groups);
    }
}

function trackLinesOfCode(increment) {
    sdk.appStorage.get('kano-draw', function (err, res) {
        if (err) { return; }

        var current = typeof res.lines_of_code === 'number' ? res.lines_of_code : 0;

        sdk.appStorage.set('kano-draw', { lines_of_code: current + increment });
    });
}

module.exports = {
    save             : save,
    load             : load,
    trackLinesOfCode : trackLinesOfCode
};