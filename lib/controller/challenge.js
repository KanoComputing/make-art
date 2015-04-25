/*
 * Challenge Controller
 *
 * Controller for export modal
 */

var app = require('../app'),
    challenges = require('../challenges/index'),
    challengeAssert = require('../challenges/util/assert'),
    language = require('../language/index'),
    session = require('../language/session'),
    sound = require('../core/sound');

var SUCCESS_MESSAGES = [
    'Well done!',
    'Nice one!',
    'Cool beans!',
    'You Wizard!',
    'Keep casting!'
];

app.controller('ChallengeController', function ($scope, $routeParams, $window, $timeout) {
    var win = angular.element($window);

    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $scope.lastChallengeVisited.set($scope.id);
    $scope.content = challenges[$scope.id - 1];
    $scope.challenge = { code: $scope.content.code };
    $scope.step = 0;
    $scope.hasNext = challenges.length > $scope.id;
    // $scope.started = false;
    $scope.started = true;
    $scope.animationClass = '';

    $scope.$watch('step', function (step) {
        $scope.hint = $scope.content.steps[step] ? $scope.content.steps[step].hint : null;
        $scope.solution = $scope.getSolution();

        if (step > 0) {
            animateAndPlaySound();
        }
    });

    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        $scope.closeChallengeComplete();
    }

    /*
     * Show / Hide solution
     *
     * @return void
     */
    $scope.toggleSolution = function () {
        $scope.showSolution = !$scope.showSolution;
    };

    /*
     * Validate code to determine success of challenge
     *
     * @return void
     */
    $scope.validate = function () {
        // Next tick...
        setTimeout(function () {
            var code = language.strip($scope.challenge.code),
                step = 0,
                steps = $scope.content.steps,
                history = session.steps || [],
                assertObj = challengeAssert(code, history),
                validateStep, i, finished;

            for (i = $scope.step; i < steps.length; i += 1) {
                validateStep = steps[i].validate;

                if (validateStep.call(assertObj, code, history)) {
                    step = i + 1;
                }
            }

            if (step > $scope.step) {
                $scope.step = step;
                $scope.showSolution = false;
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

        return content.solution;
    };

    /*
     * Show success message
     *
     * @return void
     */
    $scope.successMessage = function () {
        //If we are executing draw on Pi we want to show the xp gained
        var successMsg = SUCCESS_MESSAGES[$scope.id % SUCCESS_MESSAGES.length],
            xpMessage = ' and earned ' + $scope.xpGain + 'xp!',
            onlineMessage = successMsg + ' You completed challenge ' + $scope.id,
            offlineMessage = onlineMessage + xpMessage;

        return window.CONFIG.OFFLINE ? offlineMessage : onlineMessage; 
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
     * Show complete challenge panel
     *
     * @return void
     */
    $scope.challengeComplete = function () {
        $scope.isChallengeCompleteOpen = true;
    };

    /*
     * Hide complete challenge panel
     *
     * @return void
     */
    $scope.closeChallengeComplete = function () {
        $scope.isChallengeCompleteOpen = false;
    };

    // Listen for key press
    win.bind('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            $scope.$apply();
        }
    });

    /*
     * Animate progress circle and play sound
     *
     * @return void
     */

    function animateAndPlaySound () {
        $scope.animationClass = 'animate-pulse';

        sound.play('success');

        $timeout(resetAnimation, 500);

        function resetAnimation () {
            $scope.animationClass = '';
        }

    }

    init();
});
