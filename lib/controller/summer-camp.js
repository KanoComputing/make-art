var app = require('../app'),
    challenges = require('../challenges/index'),
    api = require('../api'),
    config = require('../core/config');

/*
 * Summer Challenges Controller
 *
 * Controller for summer challenges selection screen
 */

app.controller('SummerCampController', function ($scope, $rootScope) {
    // Assign index to each challenge
    challenges.forEach(function (challenge, i) {
        challenge.index = i;
    });

    $scope.summerChallenges = challenges;

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
     * @param {Object} day
     * @return void
     */
    $scope.selectChallenge = function (day) {
        if ($scope.isLocked(day)) { return; }

        $scope.selectedSummerChallenge = day;
    };

    /*
     * Deselect a challenge and close challenge modal
     *
     * @return void
     */
    $scope.deselectedChallenge = function () {
        $scope.selectedSummerChallenge = null;
    };

    /*
     * Returns an AP containing max elements
     *
     * @param {Number} max
     * @return {Array}
     */
    $scope.range = function (max) {
        var ar = [];
        for(var i = 1; i <= max; i++) {
            ar.push(i)
        }
        return ar;
    };

    // Close register modal
    $scope.closeModal = function () {
        $scope.register = false;
    };

    // Create calendar dates
    $scope.weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
});