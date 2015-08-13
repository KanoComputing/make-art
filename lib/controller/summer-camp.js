var app = require('../app'),
    challenges = require('../challenges/summer_camp/index'),
    api = require('../api'),
    config = require('../core/config'),
    moment = require('moment'),
    countDownInterval,
    startDate = moment('10-08-2015 06:00:00', 'DD-MM-YYYY HH:mm:ss'),
    analytics = require('../core/analytics');

if (config.TEST_MODE) {
    startDate = moment('01-07-2015 06:00:00', 'DD-MM-YYYY HH:mm:ss');
}

/*
 * Summer Challenges Controller
 *
 * Controller for summer challenges selection screen
 */

app.controller('SummerCampController', function ($interval, $scope, $rootScope, $location) {

    // Assign index to each challenge
    challenges.forEach(function (challenge, i) {
        challenge.index = i;
    });

    $scope.summerCampChallenges = challenges;
    $scope.selectedSummerChallenge = null;
    $scope.isFutureChallenge = false;
    $rootScope.progress.groups['summercamp'] = $rootScope.progress.groups['summercamp'] || { 'challengeNo' : 1 }; 

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = function (index) {
        return index + 1 < $rootScope.progress.groups['summercamp'].challengeNo;
    };

    /**
     * Return an additional class for the background in the calendar
     * @param  {number} the day
     * @return {string}
     */
    $scope.additionalBgClass = function (day) {
        var additionalClass = (challenges[day] ? challenges[day].icon_class: null);
        if (!$scope.isCompleted(day) && (additionalClass)) {
            return additionalClass;
        }
        if ($scope.isCompleted(day)) {
            return '';
        }
        return 'unknown';
    };

    /*
     * Returns true if challenge is locked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLocked = function (index) {

        if (config.TEST_MODE) {
            return false;
        }

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

        var selectedChallenge = day;
        $scope.selectedSummerChallengeDay = startDate.date() + day;
        $scope.selectedSummerChallenge = selectedChallenge;
        $scope.selectedSummerChallengeObj = challenges[selectedChallenge];
        $scope.isFutureChallenge = (day > currentDayIndex()) ? true : false;
        analytics.track('Viewed Challenge ' + day, {
            category : 'Viewed Summer Camp Challenge'
        });
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
            ar.push(i);
        }
        return ar;
    };

    // Close register modal
    $scope.closeModal = function () {
        $scope.register = false;
    };

    // Create calendar dates
    $scope.weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    $scope.loading = true;

    $scope.currentDay = function(index) {
        return index >= $rootScope.progress.groups['summercamp'].challengeNo && checkTime(index);
    };

    // This is just used to highlight the day name on the calendar
    $scope.isCurrentDayIndex = function(index) {
        var now = new Date();
        return index === (now.getDay() || 7) - 1;
    }

    function currentDayIndex() {
        var today = moment(),
            diff = today.diff(startDate),
            remainder = diff / 1000;

        return parseInt(remainder / 86400, 10);
    }

    function countDown() {
        var today = moment();
        var diff = startDate.diff(today);
        var remainder = diff / 1000;

        $scope.days = parseInt(remainder / 86400, 10);
        remainder = remainder % 86400;
         
        $scope.hours = parseInt(remainder / 3600, 10);
        $scope.hours = (($scope.hours < 10) ? '0' : '') + $scope.hours;
        remainder = remainder % 3600;
         
        $scope.minutes = parseInt(remainder / 60, 10);
        $scope.minutes = (($scope.minutes < 10) ? '0' : '') + $scope.minutes;
        
        $scope.seconds = parseInt(remainder % 60, 10);
        $scope.seconds = (($scope.seconds < 10) ? '0' : '') + $scope.seconds;

        $scope.loading = false;
        if (diff < 1) {
            if (countDownInterval) {
                $interval.cancel(countDownInterval);
            }
            $location.path('/summercamp');
        }
    }



    function checkTime(index) {
        var today = moment();
        if(today.isAfter(startDate)) {
            var dayDiff = today.date() - startDate.date();
            if (index <= dayDiff) {

                $interval(function () {
                    $scope.currentDay(index + 1);
                }, today.diff(startDate));
                return true;
            }
        }
        else {
            return false;
        }
    }

    if (!config.TEST_MODE) {
        countDownInterval = $interval(countDown, 1000);
    }
    
    // We have our indexes screwed somewhere. I shouldn't have to do -1 here
    $scope.selectChallenge($rootScope.progress.groups['summercamp'].challengeNo - 1);

});
