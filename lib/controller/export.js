var app = require('../app');

app.controller('export', function($scope, $window) {
    var win = angular.element($window),
        canvas = document.querySelector('canvas');

    $scope.isOpen = false;

    $scope.openDialog = function() {
        $scope.isOpen = true;
        $scope.$apply();
    };

    $scope.export = function() {
        $scope.challengeIO[$scope.dialog](
            $scope.filename,
            $scope.code,
            $scope.description,
            $scope.getImageSrc());
    };

    $scope.getImageSrc = function() {
        var imageURL = canvas.toDataURL('image/png');

        return imageURL;
    };

    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $scope.isOpen = false;
            $scope.$apply();
        }
    });

});
