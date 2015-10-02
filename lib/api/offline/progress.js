"use strict";
var api = require('./local-api'),
    notify = require('../notify'),
    onlineProgress = require('../online/progress');

function save(progress, callback) {
    //needs to be updated to the new "progress"
    api.progress.save({ progress: progress })
    .then(function (res) {
        var xpGain = res.body;

        callback(xpGain);
    }, notify.failure);
}

function load(callback) {
    var challenge = 0,
        groupsData = localStorage.groups ? JSON.parse(localStorage.groups) : {};

    if (localStorage.challenge) {
        //this is for backwards compatibility
        challenge = parseInt(localStorage.challenge, 10) || 0;
        groupsData.basic = groupsData.basic || {};
        groupsData.basic.challengeNo = challenge;
    }

    api.progress.load().then(function (res) {
        var data = res.body;
        console.log("Progress-----------------");
        console.dir(JSON.stringify(data));
        if (data && data.challenge && data.challenge > challenge) {
            //the old version of "progress" refers to the "basic challenges"
            challenge = data.challenge;
            data.groups.basic = data.groups.basic || {challengeNo: 1};
            if (challenge > data.groups.basic.challengeNo) {
                data.groups.basic.challengeNo = challenge;
            }
        }
        if (!data.groups) {
            //if we still have no joy
            data.groups = groupsData;
        }
        callback(data.groups);
    }, function (err) {
        if (groupsData.basic) {
            callback(groupsData);
        } else {
            notify.failure(err);
        }
    });
}

//missing tracklines of code


module.exports = {
    save             : save,
    load             : load,
    trackLinesOfCode : onlineProgress.trackLinesOfCode
};
