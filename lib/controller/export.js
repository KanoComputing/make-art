var app = require('../app'),
    challengeIO = require('../api/challenge-io');

app.controller('export', function($scope, $window) {
    var win = angular.element($window),
        canvas = document.querySelector('canvas');

    $scope.isOpen = false;

    $scope.openDialog = function() {
        $scope.isOpen = true;
        $scope.$apply();
    };

    if ($scope.dialog === 'save') {
        $scope.exportFn = challengeIO.local.save;
    } else {
        $scope.exportFn = challengeIO.web.share;
    }

    $scope.export = function() {
        $scope.exportFn(
            $scope.filename,
            $scope.playground.code,
            $scope.description,
            $scope.getImageSrc());

        $scope.isOpen = false;
        $scope.$apply();
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
