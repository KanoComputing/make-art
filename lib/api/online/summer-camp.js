var Service = require('api-service');

var apiService = new Service('http://localhost:1234');

apiService.add('getLeaderboard', {
    method : 'get',
    route  : '/leaderboard/summercamp'
});

apiService.add('getUserLeaderboard', {
    method : 'get',
    route  : '/leaderboard/summercamp?username=:username',
    params : [ 'username' ]
});

module.exports = apiService;
