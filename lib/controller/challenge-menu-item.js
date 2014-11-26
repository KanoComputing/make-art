var app = require('../app');

app.controller('challengeMenuItem', function($rootScope, $scope) {
    $scope.challengeNo = $scope.$index + 1;

    $scope.isLocked = function() {
        return  $scope.challengeNo > $rootScope.progress.challengeNo;
    };
});
