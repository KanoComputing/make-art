var app = require('../app'),
    api;

app.controller('ExportController', function($scope, $window, $rootScope) {
    api = $rootScope.api;
    var win = angular.element($window),
        canvas;

    $scope.canvasURL = '';

    window.onbeforeunload = function () {
        if (!$scope.playground.code) {
            localStorage.removeItem('playgroundCode');
        } else {
            localStorage.playgroundCode = $scope.playground.code;
        }
    };

    var getWallpapers = function() {
        canvas = document.querySelector('canvas');

        var ratios = {
                '1024': {
                    width  : 1024,
                    height : 768
                },
                '4-3': {
                    width  : 1600,
                    height : 1200
                },
                '16-9': {
                    width  : 1920,
                    height : 1080
                }
            },
            original = {
                width  : canvas.width,
                height : canvas.height
            },
            tempCanvas = document.createElement('canvas'),
            tempCtx = tempCanvas.getContext('2d'),
            wallpapers = {};

        var setCanvas = function(size) {
            var scaleFactor = Math.min(
                    size.width / original.width,
                    size.height / original.height),
                offset = {
                    x : (size.width / scaleFactor - original.width) / 2,
                    y : (size.height / scaleFactor - original.height) / 2
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

    $scope.openDialog = function () {
        $scope.getImageSrc(function () {
            $scope.isOpen = true;
        });
    };

    $scope.export = function () {
        if ($scope.dialog === 'save') {
            $scope.save();
        } else {
            $scope.share();
        }
    };

    $scope.save = function () {
        api.progress.trackLinesOfCode($scope.playground.code.split('\n').length);

        api.challengeIO.save(
            $scope.filename,
            $scope.playground.code,
            $scope.description,
            $scope.canvasURL
            );

        $scope.isOpen = false;
    };

    $scope.share = function () {
        if (!$rootScope.loggedIn) {
            localStorage.playgroundCode = $scope.playground.code;
            api.auth.login();
            return;
        }

        api.progress.trackLinesOfCode($scope.playground.code.split('\n').length);

        api.challengeIO.share(
            $scope.filename || null,
            $scope.playground.code,
            $scope.description || null,
            $scope.canvasURL
            );

        $scope.isOpen = false;
    };

    $scope.exportWallpaper = function () {
        var wallpapers = getWallpapers();

        api.challengeIO.saveWallpaper(
            $scope.filename,
            wallpapers['1024'],
            wallpapers['4-3'],
            wallpapers['16-9']);

        $scope.isOpen = false;
    };

    $scope.getImageSrc = function (callback) {
        html2canvas(document.querySelector('htmlDisplay').parentElement).then(function (canvas) {
            $scope.canvasURL = canvas.toDataURL('image/png');
            callback();
        });
    };

    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $scope.isOpen = false;
            $scope.$apply();
        }
    });

});
