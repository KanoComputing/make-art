"use strict";
var api,
    app = require('../app'),
    analytics = require('../core/analytics');

/*
 * Challenges Controller
 *
 * Controller for challenges selection screen
 */

app.controller('ChallengesController', function ($scope, $rootScope, contentService) {
    var inWorldProgress = {challengeNo: 1};

    api = $rootScope.api;

    init();

    function getProgressGroup(worldId) {
        var progressGroup = $rootScope.progress.groups[worldId];
        if (!progressGroup) {
            progressGroup = {challengeNo: 1};
            $rootScope.progress.groups[worldId] = progressGroup;
        }
        return progressGroup;
    }
    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        if ($rootScope.selectedWorld) {
            $scope.challenges = $rootScope.selectedWorld.challenges;
            inWorldProgress = getProgressGroup($rootScope.selectedWorld.id);
        }
        contentService.getWorlds().then(function gotWorlds(data) {
            $scope.worlds = data;
        },
        function errorWorlds(err) {
            //we might want in the future to load something offline
            console.err("Couldn't load worlds " + err);
        });

        api.online.share.list({}, { app_name: 'kano-draw', limit: 19 })
        .then(function (res) {
            // Next tick..
            setTimeout(function () {
                $scope.shares = res.body.entries;
                $scope.$apply();
            });
        });
    }
    /**
     * Loads all the information for a world
     * @param  {object} world the object that contains the world information
     */
    $scope.loadWorld = function (world) {
        var worldPath = "worlds/" + world.id;
        contentService.getWorld(worldPath).then(function (data) {
            $scope.challenges = data.challenges;
            $rootScope.selectedWorld = data;
            inWorldProgress = getProgressGroup($rootScope.selectedWorld.id);

        });
    };

    $scope.unloadWorld = function () {
        $rootScope.selectedWorld = undefined;
        inWorldProgress = {challengeNo: 1};
    };

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = function (index) {
        return index < inWorldProgress.challengeNo;
    };

    /*
     * Open Kano World browse popup if offline, proceed with normal event if online
     *
     * @return void
     */
    $scope.browseMore = function (e) {
        if ($rootScope.cfg.OFFLINE) {
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
        return index > inWorldProgress.challengeNo;
    };

    /*
     * Returns true if challenge is last unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCurrent = function (index) {
        return index === inWorldProgress.challengeNo;
    };

    /*
     * Returns true if all challenges have been unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isLastUnlocked = function (index) {
        return index === inWorldProgress.challengeNo;
    };

    /**
    *Returns true if a world is locked;
    */
    $scope.isWorldLocked = function (world) {
        var now = new Date(),
            start_date;

        console.log("----------------------  isWorldLocked ");
        if (world.start_date) {
            console.dir("Now    " + now);
            console.dir("start_date    " + start_date);
            start_date = new Date(world.start_date);
            return (start_date < now);
        } else {
            return false;
        }
    };

    /*
     * Select a challenge and open challenge modal
     *
     * @param {Object} challenge
     * @return void
     */
    $scope.selectChallenge = function (challenge) {
        if ($scope.isLocked(challenge.index)) {
            return;
        }

        analytics.track('Viewed Challenge ' + $rootScope.selectedWorld + "/" + challenge.id, {
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
