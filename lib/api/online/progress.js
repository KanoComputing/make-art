var sdk = require('kano-world-sdk');

function save(challengeNo, callback) {
    localStorage.challenge = challengeNo;

    if (sdk.auth.getUser()) {
        sdk.appStorage.set('kano-draw', { challenge: challengeNo }, function () {
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

            callback(challenge);
        });
    } else {
        callback(challenge);
    }
}

module.exports = {
    save : save,
    load : load
};
