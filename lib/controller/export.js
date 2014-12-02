var app = require('../app'),
    challengeIO = require('../api/challenge-io');

app.controller('export', function($scope, $window) {
    var win = angular.element($window),
        canvas = document.querySelector('canvas');

    var getWallpapers = function() {
        var ratios = {
                '1024': {
                    'width': 1024,
                    'height': 768
                },
                '4-3': {
                    'width': 1600,
                    'height': 1200
                },
                '16-9': {
                    'width': 1920,
                    'height': 1080
                }
            },
            original = {
                'width': canvas.width,
                'height': canvas.height
            },
            tempCanvas = document.createElement('canvas'),
            tempCtx = tempCanvas.getContext('2d'),
            wallpapers = {};

        var setCanvas = function(size) {
            var scaleFactor = Math.min(
                    size.width / original.width,
                    size.height / original.height),
                offset = {
                    'x': (size.width / scaleFactor - original.width) / 2,
                    'y': (size.height / scaleFactor - original.height) / 2
                };

            tempCanvas.width = size.width;
            tempCanvas.height = size.height;

            tempCtx.scale(scaleFactor, scaleFactor);
            tempCtx.drawImage(canvas, offset.x, offset.y);
        };


        for (var ratio in ratios) {
            if (ratios.hasOwnProperty(ratio)) {
                setCanvas(ratios[ratio]);
                wallpapers[ratio] = tempCanvas.toDataURL('image/png');
            }
        }

        return wallpapers;
    };

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

    $scope.exportWallpaper = function() {
        var wallpapers = getWallpapers();

        challengeIO.local.saveWallpaper(
            $scope.filename,
            wallpapers['1024'],
            wallpapers['4-3'],
            wallpapers['16-9']);

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
