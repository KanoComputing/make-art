var app = require('../app'),
    api = require('../api'),
    fileUtil = require('../util/file'),
    challenges = require('../challenges/summer_camp/index'),
    challengeAssert = require('../challenges/util/assert'),
    language = require('../language/index'),
    session = require('../language/session'),
    sound = require('../core/sound'),
    config = require('../core/config'),
    analytics = require('../core/analytics'),
    moment = require('moment');

/*
 * Challenge Controller
 *
 * Controller for export modal
 */
 
var DEF_SUCCESS_MESSAGE = 'Well done!',
    HINT_HIGHLIGHT_DELAY = 10000,
    VALIDATE_DELAY = config.OFFLINE ? 1020 : 20,
    LOCAL_STORAGE_CODE_PREFIX = 'summerChallengeCode';

app.controller('SummerCampChallengeController', function ($scope, $routeParams, $window, $timeout, $rootScope, $location) {
    var win = angular.element($window),
        hintTimer,
        summerCampGroup = $rootScope.progress.groups.summercamp,
        progressNo = summerCampGroup ? summerCampGroup.challengeNo : 1,
        now = moment().date(),
        startDate = moment('10-08-2015 06:00:00', 'DD-MM-YYYY HH:mm:ss').date(),
        diff = now - startDate;

    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $rootScope.id = $scope.id;
    $rootScope.progessNo = progressNo;

    // Check if the difference in the route params and the current day of summercamp is greater than 1
    // Check if the id in the route params is either greater than or equal to the progress challenge number.
    // If both are true, then redirect the user to the summercamp calendar
    if (!config.TEST_MODE && ($scope.id - diff) > 1 && $scope.id >= progressNo) {
        $location.path('/summercamp');
    }
    else {
        $scope.lastChallengeVisited.set($scope.id, 'summercamp');
    }

    $scope.content = challenges[$scope.id - 1];
    $scope.challenge = { code: $scope.content.code };
    $scope.hasNext = challenges.length > $scope.id;
    $scope.openModal = null;

    setStep(0);
    $scope.started = true;
    $scope.animationClass = '';
    analytics.track('Started Challenge ' + $scope.id, {
        category: 'Started Summer Camp Challenge'
    });


    $scope.$watch('step', function (step) {
        $scope.hint = $scope.content.steps[step] ? $scope.content.steps[step].hint : null;
        $scope.solution = $scope.getSolution();
        animateAndPlaySound(step);
    });

    $rootScope.$watch('successful', function (msg) {
        if (msg) {
            if (!$rootScope.progessNo || $rootScope.id >= $rootScope.progessNo) {
                $rootScope.updateProgress($rootScope.id + 1, 'summercamp');
            }
            $rootScope.successful = false;
            $location.path('/summercamp');
        }
    });

    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        $scope.challenge.code = $scope.challenge.code || retrieveCode($scope.id - 1);
        $scope.validate(true);
        $scope.closeChallengeComplete();
        $scope.completed = $scope.id < $rootScope.progress.groups.summercamp.challengeNo;
    }

    /*
     * Get back to first step
     *
     * @return void
     */
    $scope.restart = function () {
        var localStorageKey = LOCAL_STORAGE_CODE_PREFIX +  ($scope.id - 1);
        if (localStorage[localStorageKey]) {
            localStorage.removeItem(localStorageKey);
        }
        $scope.step = 0;
        $scope.completed = false;
    };

 
    /*
     * Show / Hide solution
     *
     * @return void
     */
    $scope.toggleSolution = function () {
        if (hintTimer) { $timeout.cancel(hintTimer); }
        $scope.highlightHelp = false;
        $scope.showSolution = !$scope.showSolution;
    };

    /**
     * 
     * Validate code to determine success of challenge
     * @param {boolean} noTracking Doesn't track completion if true (needed when loading from local storage)
     * @return void
     */
    $scope.validate = function (noTracking) {
        // Next tick...
        setTimeout(function () {
            var code = language.strip($scope.challenge.code),
                step = 0,
                steps = $scope.content.steps,
                history = session.steps || [],
                assertObj = challengeAssert(code, history),
                validateStep, i, finished;
            storeCode($scope.id - 1 );
            for (i = $scope.step; i < steps.length; i += 1) {
                validateStep = steps[i].validate;

                if (validateStep.call(assertObj, code, history)) {
                    step = i + 1;
                }
            }

            if (step > $scope.step) {
                setStep(step);
            }

            if ($scope.step > steps.length - 1) {
                finished = true;
            }

            if (session.steps && finished && !$scope.completed) {
                $scope.completed = true;
                
                if (!noTracking) {
                    analytics.track('Completed Challenge ' + $scope.id, {
                        category: 'Completed Summer Camp Challenge'
                    });
                    
                    api.progress.trackLinesOfCode($scope.challenge.code.split('\n').length);
                }
            }

            $scope.$apply();
        }, VALIDATE_DELAY);
    };

    $rootScope.shareModal = false;


    function storeCode (index) {
        var key = LOCAL_STORAGE_CODE_PREFIX + index;
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
        localStorage[key] = $scope.challenge.code;
    }

    function retrieveCode (index) {
        var key = LOCAL_STORAGE_CODE_PREFIX + index;
        return localStorage[key] || '';
    }

    //opens a modal
    $scope.setOpenModal = function () {
        $rootScope.shareModal = true;
    };

    /*
     * Set current challenge step
     *
     * @param {Number} index
     * @return void
     */
    function setStep(index) {
        if (hintTimer) { $timeout.cancel(hintTimer); }

        $scope.highlightHelp = false;

        $scope.step = index;
        $scope.showSolution = false;
        hintTimer = $timeout(function() {
            $scope.highlightHelp = true;
        }, HINT_HIGHLIGHT_DELAY);
    }

    /*
     * Get current step solution
     *
     * @return {String}
     */
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
        var xpGain = parseInt($scope.xpGain, 10),
            successMsg = $scope.content.completion_text || DEF_SUCCESS_MESSAGE,
            xpMessage = xpGain ? ' You earned ' + $scope.xpGain + 'xp!' : '',
            onlineMessage = successMsg,
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
        $scope.openFeedback();
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
