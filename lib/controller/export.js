/*
 * Export Controller
 *
 * Controller for export modal
 */

var app = require('../app'),
    api = require('../api');

var WALLPAPER_RATIOS = {
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
    };

app.controller('ExportController', function($scope, $window, $rootScope) {
    var win = angular.element($window),
        canvas;

    $scope.canvasURL = '';
    $scope.isOpen = false;

    // Store playground code before closing
    window.onbeforeunload = storePlaygroundCode;

    /*
     * Open export dialog
     * @return void
     */
    $scope.openDialog = function () {
        $scope.getImageSrc();
        $scope.isOpen = true;
    };

    /*
     * Export item
     * @return void
     */
    $scope.export = function () {
        api.challengeIO.save(
            $scope.filename,
            $scope.playground.code,
            $scope.description,
            $scope.canvasURL
            );

        $scope.isOpen = false;
    };

    /*
     * Share item
     * @return void
     */
    $scope.share = function() {
        if (!$rootScope.loggedIn) {
            // Store current details and prompt login if not currently logged in
            localStorage.playgroundCode = $scope.playground.code;
            api.auth.login();
            return;
        }

        api.challengeIO.share(
            $scope.filename || null,
            $scope.playground.code,
            $scope.description || null,
            $scope.canvasURL
            );

        $scope.isOpen = false;
    };

    /*
     * Export images
     * @return void
     */
    $scope.exportWallpaper = function() {
        var wallpapers = getWallpapers();

        api.challengeIO.local.saveWallpaper(
            $scope.filename,
            wallpapers['1024'],
            wallpapers['4-3'],
            wallpapers['16-9']);

        $scope.isOpen = false;
    };

    /*
     * Get image data URL
     * @return {String}
     */
    $scope.getImageSrc = function() {
        canvas = document.querySelector('canvas');
        $scope.canvasURL = canvas.toDataURL('image/png');
    };

    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $scope.isOpen = false;
            $scope.$apply();
        }
    });

    /*
     * Save current playground code in localStorage (Or remove if empty)
     * @return void
     */
    function storePlaygroundCode() {
        if (!$scope.playground.code) {
            localStorage.removeItem('playgroundCode');
        } else {
            localStorage.playgroundCode = $scope.playground.code;
        }
    }

    // TODO: Split and refactor this function in a sensible and readable way

    /*
     * Generate wallpapers from current canvas
     * @return void
     */
    function getWallpapers() {
        canvas = document.querySelector('canvas');

        var original = {
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

        for (var ratio in WALLPAPER_RATIOS) {
            if (WALLPAPER_RATIOS.hasOwnProperty(ratio)) {
                setCanvas(WALLPAPER_RATIOS[ratio]);
                wallpapers[ratio] = tempCanvas.toDataURL('image/png');
            }
        }

        return wallpapers;
    }
});