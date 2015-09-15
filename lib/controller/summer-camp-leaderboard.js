var app = require('../app'),
    api;

app.controller('SummerCampLeaderboardController', function ($scope, $rootScope) {
    api = $rootScope.api;
    // setTimeout needed because $rootScope.user not populated in time
    setTimeout(function() {
        var leaderboardFn = api.summercamp.getLeaderboard,
            username;

        if ($rootScope.user) {
            username = $rootScope.user.username;
            leaderboardFn = api.summercamp.getUserLeaderboard;
        }

        leaderboardFn({
            username: username
        })
        .then(function (res) {
            $scope.leaderboard_entries = res.body;
            $scope.$apply();
        }, function (res) {
            $scope.showError(res.body);
        })
        .catch(function (err) {
            throw err;
        });
    }, 500);
});
