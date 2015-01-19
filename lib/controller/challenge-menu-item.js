var app = require('../app');

app.controller('ChallengeMenuItemController', function($rootScope, $scope) {
    $scope.challengeNo = $scope.$index + 1;

    $scope.isLocked = function() {
        return $scope.challengeNo > $rootScope.progress.challengeNo + 1;
    };

    $scope.isLastUnlocked = function() {
        return  $scope.challengeNo === $rootScope.progress.challengeNo;
    };
});
