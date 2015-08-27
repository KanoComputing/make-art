var app = require('../app');

app.controller('SummerCampFeedbackController', function ($scope, $rootScope) {
    $scope.screen_no = 1;

    $scope.next = function(){
        $scope.screen_no++;
    };
});
