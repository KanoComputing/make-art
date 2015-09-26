"use strict";
var app = require('../app'),
    api,
    fileUtil = require('../util/file'),
    challenges = require('../challenges/index'),
    language = require('../language/index'),
    session = require('../language/session'),
    sound = require('../core/sound'),
    analytics = require('../core/analytics'),
    getValidator = require('../challenges/util/validator'),
    DEFAULT_SUCCESS_MESSAGE = 'Well done!', //null
    HINT_HIGHLIGHT_DELAY = 10000,
    VALIDATE_DELAY;
/*
 * Challenge Controller
 *
 * Controller for export modal
 */

app.controller('ChallengeController', function ($scope, $routeParams, $window, $timeout, $rootScope) {
    var win = angular.element($window),
        hintTimer;

    api = $rootScope.api;
    VALIDATE_DELAY = $rootScope.cfg.OFFLINE ? 1020 : 20;

    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $scope.lastChallengeVisited.set($scope.id);
    $scope.content = challenges[$scope.id - 1];
    $scope.challenge = { code: $scope.content.code };
    $scope.validator = getValidator($scope.content.steps);

    $scope.fatherDay = $scope.content.fatherDay;

    $scope.hasNext = challenges.length > $scope.id;
    setStep(0);
    $scope.started = true;
    $scope.animationClass = '';
    analytics.track('Started Challenge ' + $scope.id, {
        category: 'Started Challenge'
    });

    $scope.$watch('step', function (step) {
        $scope.hint = $scope.content.steps[step] ? $scope.content.steps[step].hint : null;
        $scope.solution = $scope.getSolution();
        animateAndPlaySound(step);
    });

    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        $scope.closeChallengeComplete();

        if ($scope.fatherDay && localStorage.fatherDayCode) {
            $scope.challenge.code = localStorage.fatherDayCode;
            $scope.completed = true;
        }
    }

    /*
     * Share father's day card
     *
     * @return void
     */
    $scope.shareFatherDay = function () {
        var canvas = document.querySelector('canvas'),
            image = canvas.toDataURL('image/png'),
            cover = fileUtil.dataURItoBlob(image),
            attachment = new Blob([$scope.challenge.code], { type: 'text/plain' });

        cover.filename = 'cover.png';
        attachment.filename = 'code.draw';

        api.online.share.post({
            app   : 'kano-draw',
            title : 'Father\'s Day Card',
            files : {
                cover      : cover,
                attachment : attachment
            }
        })
        .then(function (res) {
            var itemId = res.body.item.id;

            location.href = 'http://fathersday.kano.me/card/' + itemId + '/edit';
        });
    };

    /*
     * Get back to first step
     *
     * @return void
     */
    $scope.restart = function () {
        $scope.step = 0;
        $scope.completed = false;
    };

    /*
     * Show / Hide solution
     *
     * @return void
     */
    $scope.toggleSolution = function () {
        if (hintTimer) {
            $timeout.cancel(hintTimer);
        }
        $scope.highlightHelp = false;
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
                finished,
                report;


            report = $scope.validator.validate(code, steps);

            $scope.challengeReport = report;

            step = (report.lastValidStep !== null) ? report.lastValidStep + 1 : 0;
            finished = report.complete;

            if (step > $scope.step) {
                setStep(step);
            }

            if (session.steps && finished && !$scope.completed) {
                analytics.track('Completed Challenge ' + $scope.id, {
                    category: 'Completed Challenge'
                });
                $scope.completed = true;

                if ($scope.fatherDay) {
                    localStorage.fatherDayComplete = true;
                    localStorage.fatherDayCode = $scope.challenge.code;
                } else {
                    $rootScope.updateProgress($scope.id + 1);
                }

                $rootScope.updateProgress($scope.id + 1);
                api.progress.trackLinesOfCode($scope.challenge.code.split('\n').length);
            }

            $scope.$apply();

        }, VALIDATE_DELAY);
    };

    /*
     * Set current challenge step
     *
     * @param {Number} index
     * @return void
     */
    function setStep(index) {
        if (hintTimer) {
            $timeout.cancel(hintTimer);
        }

        $scope.highlightHelp = false;

        $scope.step = index;
        $scope.showSolution = false;

        hintTimer = $timeout(function () {
            $scope.highlightHelp = true;
        }, HINT_HIGHLIGHT_DELAY);
    }

    /*
     * Get current step solution
     *
     * @return {String}
     */
    $scope.getSolution = function () {
        var steps = $scope.content.steps,
            i,
            solution = "";


        if (!steps) {
            return null;
        }
        for (i = 0; i <= $scope.step; i++) {
            if (steps[i]) {
                solution += steps[i].solution + "\n";
            }
        }
        return solution;
    };

    /*
     * Show success message
     *
     * @return void
     */
    $scope.successMessage = function () {
        //If we are executing draw on Pi we want to show the xp gained
        var xpGain = parseInt($scope.xpGain, 10),
            successMsg = $scope.content.completion_text || DEFAULT_SUCCESS_MESSAGE,
            xpMessage = xpGain ? ' You earned ' + $scope.xpGain + 'xp!' : '',
            onlineMessage = successMsg,
            offlineMessage = onlineMessage + xpMessage;

        return $rootScope.cfg.OFFLINE ? offlineMessage : onlineMessage;
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
    function animateAndPlaySound(step) {
        if (step) {
            $scope.animationClass = 'animate-pulse';

            if (step < $scope.content.steps.length) {
                sound.play('pop');
            } else {
                sound.play('success');
            }

            $timeout(resetAnimation, 500);
        }

        function resetAnimation() {
            $scope.animationClass = '';
        }
    }

    /*
     * Close game completion modal
     *
     * @return void
     */
    $scope.openFinishedGame = function() {
        $scope.gameCompleteOpen = true;
    };

    /*
     * Close game completion modal
     *
     * @return void
     */
    $scope.closeFinishedGame = function() {
        $scope.challengeCompleteOpen = false;
    };

    init();
});
