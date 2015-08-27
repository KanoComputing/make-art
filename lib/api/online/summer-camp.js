var sdk = require('kano-world-sdk');
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
    params : [ 'username', 'email', 'question_text', 'answer', 'tags' ]
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


module.exports = api;
