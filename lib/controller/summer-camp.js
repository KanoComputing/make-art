var app = require('../app'),
    challenges = require('../challenges/summer_camp/index'),
    api = require('../api'),
    config = require('../core/config'),
    moment = require('moment');

/*
 * Summer Challenges Controller
 *
 * Controller for summer challenges selection screen
 */

app.controller('SummerCampController', function ($interval, $scope, $rootScope) {

    // Assign index to each challenge
    challenges.forEach(function (challenge, i) {
        challenge.index = i;
    });

    $scope.summerChallenges = challenges;
    $scope.selectedSummerChallenge = null;
    $scope.started = false; // to be removed

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
        return index > 10;
        //return false && index >= $rootScope.progress.challengeNo;
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
        var selectedChallenge = day - 1;
        $scope.started = (selectedChallenge < 3); //REMOVE this is for demo only
        
        $scope.selectedSummerChallenge = selectedChallenge;
        $scope.selectedSummerChallengeObj = challenges[selectedChallenge];
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
            ar.push(i);
        }
        return ar;
    };

    // Close register modal
    $scope.closeModal = function () {
        $scope.register = false;
    };

    // Create calendar dates
    $scope.weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    $scope.loading = true;

    function countDown() {
        var startDate = moment('10-08-2015 06:00:00', 'DD-MM-YYYY HH:mm:ss');
        var today = moment();
        var diff = startDate.diff(today);
        var remainder = diff / 1000;

        $scope.days = parseInt(remainder / 86400);
        remainder = remainder % 86400;
         
        $scope.hours = parseInt(remainder / 3600);
        $scope.hours = (($scope.hours < 10) ? '0' : '') + $scope.hours;
        remainder = remainder % 3600;
         
        $scope.minutes = parseInt(remainder / 60);
        $scope.minutes = (($scope.minutes < 10) ? '0' : '') + $scope.minutes;
        
        $scope.seconds = parseInt(remainder % 60);
        $scope.seconds = (($scope.seconds < 10) ? '0' : '') + $scope.seconds;

        $scope.loading = false;
    }

    $interval(countDown, 1000);
});