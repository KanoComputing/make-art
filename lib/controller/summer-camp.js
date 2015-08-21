var app = require('../app'),
    challenges = require('../challenges/summer_camp/index'),
    api = require('../api'),
    config = require('../core/config'),
    social = require('../core/social'),
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

app.controller('SummerCampController', function ($interval, $timeout, $scope, $rootScope, $location) {
    $scope.feedbackOpen = true;

    $scope.openFeedback = function(){
            $scope.feedbackOpen = true;
            $scope.$apply();
    };

    $scope.closeFeedback = function(){
            $scope.feedbackOpen = false;
            $scope.$apply();
    };

    // Assign index to each challenge
    challenges.forEach(function (challenge, i) {
        challenge.index = i;
    });

    $scope.summerCampChallenges = challenges;
    $scope.selectedSummerChallenge = null;
    $scope.isFutureChallenge = false;
    $rootScope.progress.groups['summercamp'] = $rootScope.progress.groups['summercamp'] || { 'challengeNo' : 1 };

    // Add cover image of shares to respective summer camp challenges
    // Declare variables to be used
    var i, uid, shares, challengeNo;

    // Check if there's a uuid variable in the localStorage
    if (localStorage.uuid) {
        uid = localStorage.uuid;

        // Get about 50 shares by a user based on the user's id
        api.online.share.list({}, {limit: 50, user_id: uid})
        .then(function(data) {
            // Assign the entries from the returned object into the shares variable
            shares = data.body.entries;

            // loop through the objects in the shares
            for (i = 0; i < shares.length; i++) {
                // check for every share that has a summerCamp campaign code
                if (shares[i].campaign_ref.code === 'summerCamp') {
                    // Reduce the challengeNo in the share campaign_ref by 1 and assign it to the challengeNo variable
                    challengeNo = shares[i].campaign_ref.challengeNo - 1;
                    // Find the respective summercamp challenge and assign a cover_url, world_url, shareTitle, shareDescription & username to the challenge
                    $scope.summerCampChallenges[challengeNo].cover_url = shares[i].cover_url;
                    $scope.summerCampChallenges[challengeNo].world_url = 'http://world.kano.me/shared/' + shares[i].id;
                    $scope.summerCampChallenges[challengeNo].shareTitle = shares[i].title;
                    $scope.summerCampChallenges[challengeNo].shareDescription = shares[i].description;
                    $scope.summerCampChallenges[challengeNo].username = shares[i].user.username;
                }
            }
        });
    }

    // Initialise the facebook SDK
    social.init();

    // Call the facebook share function
    $scope.facebookShare = function (challenge) {
        social.share.facebook({
            title   : challenge.shareTitle + ' on Make Art',
            url     : challenge.world_url,
            picture : challenge.cover_url,
            caption : 'Shared by ' + challenge.username + ' through Summer Camp',
            text    : challenge.shareDescription
        }, function (err, res) {
            if (err) { return err; }
        });
    };

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
        $scope.isFutureChallenge = isFutureChallenge(day);
        analytics.track('Viewed Challenge ' + day, {
            category : 'Viewed Summer Camp Challenge'
        });
        countDownToNext();
    };

    /*
     * Open a challenge by double-clicking and check if it's unlocked and not a future
     * challenge.
     *
     * @param {Number} day
     * @return void
     */
    $scope.openChallenge = function (day) {
        if (!$scope.isLocked(day) && !isFutureChallenge(day)) {
            day = day + 1;
            $location.path('/summercamp/challenge/' + day);
        }
    };

    // Initialize the selected day variable with -1
    $scope.selectedDay = -1;

    /* Set a day to be active when a challenge is selected in the calendar
     * Also check if the day is not locked and not a future challenge
     *
     * @param {Number} index
     * @return void
     */
    $scope.setActive = function(index) {
        if (!$scope.isLocked(index) && !isFutureChallenge(index)) {
            $scope.selectedDay = index;
        }
    };

    /* Get the active challenge day on the calendar
     * and use that to apply the proper css class
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.getActive = function(index) {
      return $scope.selectedDay === index;
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

    /*
     * Returns true if challenge is a future challenge
     *
     * @param {Number} day
     * @return {Boolean}
     */
    function isFutureChallenge(day) {
        return (day > currentDayIndex()) ? true : false;
    };

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

    function countDownToNext() {
        var day = $scope.selectedSummerChallenge + 1;
        var nextStartDate = moment(startDate);
        var now = moment();
        var nextDay = moment().add(1, 'day');
        var timeDiff;

        $scope.timeToNext = $scope.timeToNext || {};
        //debugger;
        nextStartDate.add(day, 'days');

        //console.log(day, nextDay, nextStartDate, now);
        if (nextDay.isBefore(nextStartDate)) {
            //if we're just looking at the next
            timeDiff = moment(nextStartDate.diff(now));
            //debugger;

            $scope.timeToNext.h = timeDiff.hours();
            $scope.timeToNext.m = timeDiff.minutes();
            $scope.timeToNext.s = timeDiff.seconds();
            //$scope.timeToNext = timeDiffObj;
            $timeout(countDownToNext, 500);
        } else {
            $scope.timeToNext = null;

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
    $scope.setActive($rootScope.progress.groups['summercamp'].challengeNo - 1);
});
