"use strict";
var sdk;

function progress(config) {
    sdk = require('kano-world-sdk')(config);

    return {
        save: function (challengeNo, groupName, callback) {
            var data = { groups: {} };

            if (!groupName) {
                throw "Hey, we're aren't still in 2014";
            }
            data.groups[groupName] = {};
            data.groups[groupName].challengeNo = challengeNo;
            localStorage.groups[groupName] = JSON.stringify(data.groups.groupName);

            if (sdk.auth.getUser()) {
                sdk.appStorage.set('kano-draw', data, function () {
                    localStorage.challenge = undefined;
                    callback(0);
                });
            } else {
                callback(0);
            }
        },

        load: function (callback) {
            var challenge = 0,
                groupsData = localStorage.groups ? JSON.parse(localStorage.groups) : {};

            if (localStorage.challenge) {
                //this is for backwards compatibility
                challenge = parseInt(localStorage.challenge, 10);
                groupsData.basic = groupsData.basic || {};
                groupsData.basic.challenge = challenge;
            }

            if (sdk.auth.getUser()) {
                sdk.appStorage.get('kano-draw', function (err, data) {
                    if (data && data.challenge && data.challenge > challenge) {
                        //the old version of "progress" refers to the "basic challenges"
                        challenge = data.challenge;
                        data.groups.basic = data.groups.basic || {};
                        data.groups.basic.challengeNo = challenge;
                    }
                    callback(data.groups);
                });
            } else {
                callback(groupsData);
            }
        },

        trackLinesOfCode: function (increment) {
            sdk.appStorage.get('kano-draw', function (err, res) {
                var current;
                if (err) {
                    return;
                }

                current = typeof res.lines_of_code === 'number' ? res.lines_of_code : 0;

                sdk.appStorage.set('kano-draw', { lines_of_code: current + increment });
            });
        }
    };
}

module.exports = progress;
