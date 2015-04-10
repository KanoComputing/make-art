/*
 * Level Controller
 *
 * Controller for export modal
 */

var app = require('../app'),
    levels = require('../levels/index'),
    levelAssert = require('../levels/util/assert'),
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
    $scope.step = 0;
    $scope.hasNext = levels.length > $scope.id;
    // $scope.started = false;
    $scope.started = true;

    $scope.$watch('step', function (step) {
        $scope.hint = $scope.content.steps[step].hint;
    });

    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        $scope.closeLevelComplete();
    }

    /*
     * Go to next explanation slide
     *
     * @return void
     */
    $scope.nextSlide = function () {
        $scope.slide += 1;
    };

    /*
     * Validate code to determine success of level
     *
     * @return void
     */
    $scope.validate = function () {
        // Next tick...
        setTimeout(function () {
            var code = language.strip($scope.code),
                step = 0,
                steps = $scope.content.steps,
                history = session.steps || [],
                assertObj = levelAssert(code, history),
                validateStep, i, finished;

            for (i = $scope.step; i < steps.length; i += 1) {
                validateStep = steps[i].validate;

                if (validateStep.call(assertObj, code, history)) {
                    step = i + 1;
                }
            }

            if ($scope.step < step) {
                $scope.step = step;
            }

            if ($scope.step > steps.length - 1) {
                finished = true;
            }

            if (session.steps && finished) {
                $scope.completed = true;
                $scope.updateProgress($scope.id + 1);
            }

            $scope.$apply();
        });
    };

    $scope.getSolution = function () {
        var content = $scope.content.steps[$scope.step];

        if (!content) { return null; }
        return content.solution.join('\n');
    };

    /*
     * Show success message
     *
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
     * Start challenge after reading the intro
     *
     * @return void
     */
    $scope.start = function () {
        $scope.started = true;
    };

    /*
     * Show complete level panel
     *
     * @return void
     */
    $scope.openLevelComplete = function () {
        $scope.isLevelCompleteOpen = true;
    };

    /*
     * Hide complete level panel
     *
     * @return void
     */
    $scope.closeLevelComplete = function () {
        $scope.isLevelCompleteOpen = false;
    };

    // Listen for key press
    win.bind('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            $scope.$apply();
        }
    });

    init();
});