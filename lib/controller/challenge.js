import app from '../app.js';
import language from '../language/index.js';
import sound from '../core/sound.js';
import { Telemetry } from '../core/telemetry.js';
import getValidator from '../challenges/util/validator.js';
import { angular } from '../modules/angular.js'

var DEFAULT_SUCCESS_MESSAGE = 'Well done!',
    HINT_HIGHLIGHT_DELAY = 10000,
    VALIDATE_DELAY,
    config,
    timer;
/*
 * Challenge Controller
 *
 * Controller for export modal
 */

app.controller('ChallengeController', ['$scope', '$routeParams', '$window', '$timeout', '$rootScope', '$location', 'contentService', '_config', function ($scope, $routeParams, $window, $timeout, $rootScope, $location, contentService, _config) {
    var win = angular.element($window),
        hintTimer,
        worldId;

    config = $rootScope.cfg;

    $scope._config = _config;

    /**
     * Returns true if the code compiles
     * @param  {string} code The coffeescript code
     * @return {boolean}     True if the code compiles
     */
    function isValidCode(code) {
        var err,
            // Create a canvas element
            canvas = document.createElement('canvas'),
            ctx;
        canvas.width = 500;
        canvas.height = 400;

        // Get the fake drawing context
        ctx = canvas.getContext('2d');
        err = language.run(code, { ctx: ctx });
        canvas = undefined;
        return (typeof err === 'undefined');
    }



    /**
     * Saves code in the local storage
     * @param  {string} code a string containing the code
     */
    function saveCode(code) {
        localStorage["code_" + $scope.worldId + "_" + $scope.id] = code;
    }



    /**
     * Returns the next challenge in the world if it exists
     * @return {object} The next Challenge in the world
     */
    function getNextChallenge() {
        var position = $scope.index,
            challenges = $rootScope.selectedWorld.challenges;
        return challenges[position];
    }



    /**
     * Asynchronously loads the challenge
     */
    function loadChallenge() {
        contentService.challenge.get($scope.worldId, $scope.id).then(function (challenge) {
            var lsCode;

            if ($scope.isChallengeLocked(challenge)) {
                $location.path('/challenges/' + $rootScope.selectedWorld.id);
            }

            lsCode = localStorage["code_" + $scope.worldId + "_" + $scope.id];

            $scope.content = challenge;

            $scope.index = challenge.index;
            $scope.challenge = { code: lsCode || $scope.content.code };
            $scope.validator = getValidator($scope.content.steps, config.languageSynonyms);
            $scope.next = getNextChallenge();

            setStep(0);
            $scope.started = true;
            $scope.animationClass = '';

            // Only track start of challenges. Not re-visits
            if (!lsCode) {
                Telemetry.trackEvent({ name: 'challenge_attempted', properties: { id: $scope.id } });
            }

            $scope.$watch('step', function (step) {
                $scope.hint = $scope.content.steps[step] ? $scope.content.steps[step].hint : null;
                $scope.solution = $scope.getSolution();
                animateAndPlaySound(step);
            });
        });
    }



    /**
     * Initialise controller
     *
     * @return void
     */
    function init() {
        $scope.nextModal = false;
        $scope.shareModal = false;
        $scope.loading = false;
        $scope.unlockedWorld = null;
        $rootScope.exportModal = false;
        $rootScope.successful = false;
        $scope.closeChallengeComplete();

        VALIDATE_DELAY = $rootScope.cfg.OFFLINE ? 1020 : 20;

        $scope.id = $routeParams.id;
        $scope.worldId = $routeParams.world;

        $scope.offline = $rootScope.cfg.OFFLINE;

        if (!$rootScope.worlds) {
            contentService.world.getAll().then(function (data) {
                $rootScope.worlds = data;
            }, function (err) {
                console.error("Couldn't load worlds " + err);
            });
        }

        if (!$rootScope.selectedWorld) {
            //You're hitting the address directly, and we need to load the world's information
            contentService.world.get("worlds/" + $scope.worldId).then(function (data) {
                $scope.challenges = data.challenges;
                $rootScope.selectedWorld = data;
                worldId = $rootScope.selectedWorld.id;
                $rootScope.$broadcast('world-loaded', data);
                loadChallenge();
            });
        } else {
            loadChallenge();
            worldId = $rootScope.selectedWorld.id;

        }
    }

    $rootScope.$watch('successful', function (val) {
        if (val) {
            $scope.closeExportModal();
            if ($scope.next) {
                $scope.next.locked = $scope.isChallengeLocked($scope.next) ? true : false;
            }
            $scope.openShareModal();
        }
    });

    $rootScope.openNextModal = function () {
        if (!$scope.next) {
            $scope.openFinishedGame();
        } else {
            $scope.nextModal = true;
        }
    };

    $scope.closeNextModal = function () {
        $scope.nextModal = false;
    };

    $scope.openShareModal = function () {
        if ($rootScope.creation) {
            $scope.shareModal = true;
        } else if ($rootScope.successful && !$rootScope.creation) {
            $scope.openNextModal();
        }
    };

    $scope.closeShareModal = function () {
        $scope.shareModal = false;
        $scope.closeMailTab();
    };

    $scope.openExportModal = function () {
        $rootScope.exportModal = true;
    };

    $scope.closeExportModal = function () {
        $rootScope.exportModal = false;
    };

    /**
     * Goes to the next challenge depending on the world locking strategy
     * @return {[type]} [description]
     */
    $scope.goToNext = function () {
        $scope.openNextModal();
    };

    $scope.isChallengeLocked = function isLocked(ch) {
        if (!$rootScope.progress) {
            return true;
        }
        return $rootScope.progress.completed.indexOf(ch.id) === -1 && $rootScope.progress.remaining[$rootScope.selectedWorld.id].indexOf(ch.id) !== 0;
    }

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
        if ($rootScope.cfg.OFFLINE) {
            clearTimeout(timer);
        }

        // Next tick...
        timer = setTimeout(function () {
            var code = language.strip($scope.challenge.code),
                step = 0,
                steps = $scope.content.steps,
                finished,
                report;

            report = $scope.validator.validate(code, steps);

            $scope.challengeReport = report;

            step = (report.lastValidStep !== null) ? report.lastValidStep + 1 : 0;

            if (report.complete || (step >= steps.length && isValidCode(code))) {
                //we consider complete the code of a user who reached the last step and broke previous ones
                //as long as the code compiles
                finished = true;
            }

            // This indicated that the validation was on a batch of code. Very likely reloaded from local storage
            const batchValidated = step - $scope.step > 1;

            if (step > $scope.step) {
                //we have a new valid step
                setStep(step);
                saveCode(code);
                Telemetry.trackEvent({ name: 'challenge_step', properties: { id: $scope.id, step } });
            }

            if (finished && !$scope.completed) {
                if (!batchValidated) {
                    Telemetry.trackEvent({ name: 'challenge_completed', properties: { id: $scope.id } });
                }
                $scope.completed = true;

                $rootScope.gamification.trigger([
                    { name: 'make-art-challenge-completed', detail: { world: worldId, id: $scope.id } },
                    { name: 'make-art-code-written', detail: { count: $scope.challenge.code.split('\n').length } },
                ])
                .then(() => {
                    $rootScope.loadProgress();
                });
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
                sound.play(_config.UI_ROOT, 'pop');
            } else {
                sound.play(_config.UI_ROOT, 'success');
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
    $scope.openFinishedGame = function () {
        var arr = [],
            progressGroups = $rootScope.progress.groups;

        $rootScope.worlds.forEach(function (world) {
            // Check for worlds that are not locked and not completed
            if (!contentService.world.isLocked(world) && !contentService.world.isCompleted(world)) {
                if (!progressGroups.hasOwnProperty(world.id)) {
                    // If the user has no progress for that world, it is new & unlocked
                    arr.push(world);
                }
            }
        });

        // Return the first world in the array as the unlocked world
        $scope.unlockedWorld = arr.length ? arr[0] : null;
        $scope.gameCompleteOpen = true;
    };

    /*
     * Close game completion modal
     *
     * @return void
     */
    $scope.closeFinishedGame = function () {
        $scope.challengeCompleteOpen = false;
    };

    init();
}]);
