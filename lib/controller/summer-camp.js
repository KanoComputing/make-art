var app = require('../app'),
    challenges = require('../challenges/index'),
    api = require('../api'),
<<<<<<< HEAD
    config = require('../core/config')
=======
    config = require('../core/config'),
>>>>>>> Added moment library to unlock challenges based on time
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

    $scope.summerCampChallenges = challenges;

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = function (index) {
        return index + 1 < $rootScope.progress.groups['summercamp'].challengeNo;
    };

    /*
     * Returns true if challenge is locked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLocked = function (index) {
        return index >= $rootScope.progress.groups['summercamp'].challengeNo;
    };

    /*
     * Returns true if challenge is last unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCurrent = function (index) {
        return index + 1 === $rootScope.progress.groups['summercamp'].challengeNo;
    };

    /*
     * Returns true if all challenges have been unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLastUnlocked = function (index) {
        return index === $rootScope.progress.groups['summercamp'].challengeNo;
    };

    /*
     * Select a challenge and open challenge modal
     *
     * @param {Object} day
     * @return void
     */
    $scope.selectChallenge = function (day) {
        if ($scope.isLocked(day)) { return; }

        $scope.selectedSummerChallenge = day + 1;
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
        for(var i = 0; i < max; i++) {
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

    $scope.loading = true;

    $scope.currentDay = function(index) {
        return index >= $rootScope.progress.groups['summercamp'].challengeNo && checkTime(index);
    };

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

    function checkTime(index) {
        var startDate = moment('11-07-2015 09:10:00', 'DD-MM-YYYY HH:mm:ss');
        var today = moment();
        if(today.isAfter(startDate)) {
            // var dayDiff = today.date() - startDate.date();
            var dayDiff = today.minutes() - startDate.minutes();
            if (index < dayDiff) {
                $interval(function () {
                    $scope.currentDay(index + 1);
                }, dayDiff * 1000);
                return true;
            }
        }
        else {
            return false;
        }
    }
});