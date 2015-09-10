module.exports = function (config) {
    var sdk = require('kano-world-sdk')(config);
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
};
