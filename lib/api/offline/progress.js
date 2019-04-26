"use strict";
import api from './local-api';
import notify from '../notify';


export default function (cfg) {

    function save(challengeNo, groupName, callback) {
        var data = { groups: {} },
            lsGroups = (localStorage.groups) ? JSON.parse(localStorage.groups) : {},
            opts;

        data.groups[groupName] = {};
        data.groups[groupName].challengeNo = challengeNo;
        lsGroups[groupName] = data.groups[groupName];
        localStorage.groups = JSON.stringify(lsGroups);
        opts = {
            world: groupName,
            challenge: challengeNo
        };
        api.progress.save(opts).then(function (res) {
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

    function trackLinesOfCode(increment) {
        api.linesOfCode.increment({newLines: increment});
    }

    return {
        save             : save,
        load             : load,
        trackLinesOfCode : trackLinesOfCode
    };
};
