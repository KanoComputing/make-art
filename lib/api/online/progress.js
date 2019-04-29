function progress(config) {
    return {
        save: function (user, challengeNo, groupName, callback) {
            var data = { groups: {} },
                lsGroups = (localStorage.groups) ? JSON.parse(localStorage.groups) : {};

            if (!groupName) {
                throw "Hey, we're aren't still in 2014";
            }
            data.groups[groupName] = {};
            data.groups[groupName].challengeNo = challengeNo;
            lsGroups[groupName] = data.groups[groupName];
            localStorage.groups = JSON.stringify(lsGroups);

            if (user) {
                callback(0)
                // TODO: implement with gamification
                // sdk.appStorage.set('kano-draw', data, function () {
                //     localStorage.challenge = undefined;
                //     callback(0);
                // });
            } else {
                callback(0);
            }
        },

        load: function (user, callback) {
            var challenge = 0,
                groupsData = localStorage.groups ? JSON.parse(localStorage.groups) : {};

            if (localStorage.challenge) {
                //this is for backwards compatibility
                challenge = parseInt(localStorage.challenge, 10) || 0;
                groupsData.basic = groupsData.basic || {};
                groupsData.basic.challengeNo = challenge;
            }

            if (user) {
                callback(groupsData);
                // TODO: Reimplement when progress uses new API
                // sdk.appStorage.get('kano-draw', function (err, data) {
                //     if (data && data.challenge && data.challenge > challenge) {
                //         //the old version of "progress" refers to the "basic challenges"
                //         challenge = data.challenge;
                //         data.groups.basic = data.groups.basic || {challengeNo: 1};
                //         if (challenge > data.groups.basic.challengeNo) {
                //             data.groups.basic.challengeNo = challenge;
                //         }
                //     }
                //     callback(data.groups);
                // });
            } else {
                callback(groupsData);
            }
        },

        trackLinesOfCode: function (increment) {
            // TODO: Implement with gamification
            // sdk.appStorage.get('kano-draw', function (err, res) {
            //     var current;
            //     if (err) {
            //         return;
            //     }

            //     current = typeof res.lines_of_code === 'number' ? res.lines_of_code : 0;

            //     sdk.appStorage.set('kano-draw', { lines_of_code: current + increment });
            // });
        }
    };
}

export default progress;
