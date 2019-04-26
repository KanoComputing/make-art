var sdkFactory = require('kano-world-sdk');

function summercamp (config) {
    var sdk = sdkFactory(config);
    var api = sdk.api;

    api.add('getLeaderboard', {
        method : 'get',
        route  : '/leaderboard/summercamp'
    });

    api.add('getUserLeaderboard', {
        method : 'get',
        route  : '/leaderboard/summercamp?username=:username',
        params : [ 'username' ]
    });

    api.add('sendSummerCampFeedback', {
        method : 'post',
        route  : '/questions/responses',
        params : [ 'username', 'email', 'answers']
    });

    api.completeSummercamp = function() {
        sdk.appStorage.set(
            'kano-draw',
            {
                groups: {
                    summercamp: {
                        completed: 1
                    }
                }
            }
        );
    };

    return api;
}

module.exports = summercamp;