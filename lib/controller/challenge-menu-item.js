var app = require('../app');

app.controller('challengeMenuItem', function($rootScope, $scope) {
    $scope.challengeNo = $scope.$index + 1;

    setTimeout(function(){
        $scope.isLocked =  $scope.challengeNo > $scope.progress;
    }, 0);
});
