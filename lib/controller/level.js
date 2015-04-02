/*
 * Level Controller
 *
 * Controller for export modal
 */

var app = require('../app'),
    levels = require('../levels/index'),
    language = require('../language/index'),
    session = require('../language/session');

var SUCCESS_MESSAGES = [
    'Well done!',
    'Nice one!',
    'Cool beans!',
    'You Wizard!',
    'Keep casting!'
];

app.controller('LevelController', function ($scope, $routeParams, $window) {
    var win = angular.element($window);

    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $scope.lastChallengeVisited.set($scope.id);
    $scope.content = levels[$scope.id - 1];
    $scope.code = $scope.content.code;
    $scope.hasNext = levels.length > $scope.id;
    $scope.slides = $scope.content.slides.split('---').map(function (val) {
        return val.trim();
    });

    /*
     * Initialise controller
     * @return void
     */
    function init() {
        $scope.startReading();
        $scope.openIntro();
        $scope.closeLevelComplete();
    }

    /*
     * Go to next explanation slide
     * @return void
     */
    $scope.nextSlide = function () {
        $scope.slide += 1;
    };

    /*
     * Switch to explanation reading mode
     * @return void
     */
    $scope.startReading = function () {
        $scope.slide = 0;
        $scope.mode = 'reading';
    };

    /*
     * Switch to coding mode
     * @return void
     */
    $scope.doneReading = function () {
        $scope.mode = 'coding';
    };

    /*
     * Validate code to determine success of level
     * @return void
     */
    $scope.validate = function () {
        // Next tick...
        setTimeout(function () {
            if (session.steps && $scope.content.validate(language.strip($scope.code), session.steps || [])) {
                setTimeout(function () {
                    $scope.completed = true;
                    $scope.showNextBanner = true;
                    $scope.$apply();

                    $scope.updateProgress($scope.id + 1);
                }, 1000);
            }
        });
    };

    /*
     * Show success message
     * @return void
     */
    $scope.successMessage = function () {
        return (
            SUCCESS_MESSAGES[$scope.id % SUCCESS_MESSAGES.length] +
            ' You completed challenge ' + $scope.id +
            ' and earned ' + $scope.xpGain + 'xp!'
            );
    };

    /*
     * Open level explanation intro
     * @return void
     */
    $scope.openIntro = function () {
        $scope.startReading();
        $scope.isIntroOpen = true;
    };

    /*
     * Close level explanation intro
     * @return void
     */
    $scope.closeIntro = function () {
        $scope.doneReading();
        $scope.isIntroOpen = false;
    };

    /*
     * Show complete level panel
     * @return void
     */
    $scope.openLevelComplete = function () {
        $scope.isLevelCompleteOpen = true;
    };

    /*
     * Hide complete level panel
     * @return void
     */
    $scope.closeLevelComplete = function () {
        $scope.isLevelCompleteOpen = false;
    };

    // Listen for key press
    win.bind('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            $scope.closeIntro();
            $scope.$apply();
        }
    });

    init();
});