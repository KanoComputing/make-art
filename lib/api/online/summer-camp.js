var sdk = require('kano-world-sdk').api;


sdk.add('getLeaderboard', {
    method : 'get',
    route  : '/leaderboard/summercamp'
});

sdk.add('getUserLeaderboard', {
    method : 'get',
    route  : '/leaderboard/summercamp?username=:username',
    params : [ 'username' ]
});


module.exports = sdk;
