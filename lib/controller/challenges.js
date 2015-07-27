var app = require('../app'),
    challenges = require('../challenges/index'),
    api = require('../api'),
    config = require('../core/config'),
    analytics = require('../core/analytics');

/*
 * Challenges Controller
 *
 * Controller for challenges selection screen
 */

app.controller('ChallengesController', function ($scope, $rootScope) {
    // Assign index to each challenge
    challenges.forEach(function (challenge, i) {
        challenge.index = i;
    });

    $scope.challenges = challenges.filter(function (challenge) {
        return !challenge.fatherDay;
    });

    init();

    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        api.online.share.list({}, { app_name: 'kano-draw', limit: 19 })
        .then(function (res) {
            // Next tick..
            setTimeout(function () {
                $scope.shares = res.body.entries;
                $scope.$apply();
            });
        });
    }

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = function (index) {
        return index + 1 < $rootScope.progress.challengeNo;
    };

    /*
     * Open Kano World browse popup if offline, proceed with normal event if online
     *
     * @return void
     */
    $scope.browseMore = function (e) {
        if (config.OFFLINE) {
            e.preventDefault();
            api.challengeIO.browseMore();
        }
    };

    /*
     * Returns true if challenge is locked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLocked = function (index) {
        return index >= $rootScope.progress.challengeNo;
    };

    /*
     * Returns true if challenge is last unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCurrent = function (index) {
        return index + 1 === $rootScope.progress.challengeNo;
    };

    /*
     * Returns true if all challenges have been unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLastUnlocked = function (index) {
        return index === $rootScope.progress.challengeNo;
    };

    /*
     * Select a challenge and open challenge modal
     *
     * @param {Object} challenge
     * @return void
     */
    $scope.selectChallenge = function (challenge) {
        if ($scope.isLocked(challenge.index)) { return; }

        analytics.track('Viewed Challenge ' + (challenge.index + 1), {
            category : 'Viewed Challenge'
        });
        $scope.selectedChallenge = challenge;
    };

    /*
     * Deselect a challenge and close challenge modal
     *
     * @return void
     */
    $scope.deselectedChallenge = function () {
        $scope.selectedChallenge = null;
    };
});
