var app = require('../app'),
    api = require('../api'),
    fileUtil = require('../util/file'),
    challenges = require('../challenges/index'),
    challengeAssert = require('../challenges/util/assert'),
    language = require('../language/index'),
    session = require('../language/session'),
    sound = require('../core/sound'),
    config = require('../core/config'),
    api = require('../api'),
    analytics = require('../core/analytics');

/*
 * Challenge Controller
 *
 * Controller for export modal
 */

var SUCCESS_MESSAGES = [
        'Well done!', //null
        'Nice work! That is one cool flag!', //Japan
        'Cool beans - enough of flags, let\'s try something else!', //Sweden
        'You Wizard! The next time I need spooky eyes I know who to call!', //Stare
        'Nice! Keep up the good work you face drawing genius!', //Smiley
        'Awesome balloon! Why not change the color before moving on?', //Blue balloon
        'Nice one! The canvas is 500 wide and 500 high, moving about on it is a skill!', //Stickman
        'Great! For loops let us repeat bits of code (it saves on all the typing)!', //Shrinking
        'Random functions give us a random number so we can put things in a surprise spot.', //random
        'Aweosme! Press space and see what happens to the stars...', //Starry
        'You build an awesome house with code!', //House
        'Mathmatical! Change the numbers and see what happens.', //Dots
        'Try changing the numbers in the rotate function and see what happens.', //Gradient
        'Astronomical! Change the colors and see what you can add to make your planet even cooler beforing hitting share!', //planet
        'Tasty! Finish it off with more toppings, let youe imagine run wild and see what you can make, and then share it with the world!', //Pizza
        'Well done!', //null
    ],
    HINT_HIGHLIGHT_DELAY = 10000,
    VALIDATE_DELAY = config.OFFLINE ? 1020 : 20;

app.controller('ChallengeController', function ($scope, $routeParams, $window, $timeout, $rootScope) {
    var win = angular.element($window),
        hintTimer;

    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $scope.lastChallengeVisited.set($scope.id);
    $scope.content = challenges[$scope.id - 1];
    $scope.challenge = { code: $scope.content.code };
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
            attachment = new Blob([ $scope.challenge.code ], { type: 'text/plain' });

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
        if (hintTimer) { $timeout.cancel(hintTimer); }
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
                setStep(step);
            }

            if ($scope.step > steps.length - 1) {
                finished = true;
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
            successMsg = SUCCESS_MESSAGES[$scope.id % SUCCESS_MESSAGES.length],
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
