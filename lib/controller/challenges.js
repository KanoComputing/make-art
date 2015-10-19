"use strict";
var api,
    _ = require('lodash'),
    app = require('../app'),
    analytics = require('../core/analytics');

/*
 * Challenges Controller
 *
 * Controller for challenges selection screen
 */

app.controller('ChallengesController', function ($scope, $rootScope, $routeParams, $location, contentService) {
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
        var routeWorldId = $routeParams.world,
            routeWorld;
        contentService.getWorlds().then(function gotWorlds(data) {
            $scope.worlds = data;
            if (routeWorldId) {
                //a world has  been selected through the URL
                $scope.worlds.forEach(function (world) {
                    if (world.id === routeWorldId) {
                        routeWorld = world;
                    }
                });
            }
            if (routeWorld) {
                $scope.loadWorld(routeWorld);
            } else {
                //don't load a world automatically
                $location.path('/challenges');
                $scope.unloadWorld();
            }
        }, function errorWorlds(err) {
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
        if (!$scope.isWorldLocked(world)) {
            contentService.getWorld(worldPath).then(function (data) {
                $scope.challenges = data.challenges;
                $rootScope.selectedWorld = data;
                $rootScope.selectedWorldClass = $rootScope.selectedWorld.css_class;
                inWorldProgress = getProgressGroup($rootScope.selectedWorld.id);
            });
        }
    };

    $scope.unloadWorld = function () {
        $rootScope.selectedWorld = undefined;
        $rootScope.selectedWorldClass = undefined;
        inWorldProgress = {challengeNo: 1};
        $location.path('/challenges');
    };

    /**
     * Returns true if the world is completed.
     * @param  {object}  world The world
     * @return {Boolean}       true if the world is completed
     */
    $scope.isWorldCompleted = function (world) {
        var progress = getProgressGroup(world.id);
        if (progress.challengeNo > world.challenges_num) {
            return true;
        }
        return false;
    };

    /**
    *Returns true if a world is locked;
    */
    $scope.isWorldLocked = function (world) {
        var now = new Date(),
            date_status,
            start_date;


        if (world.start_date) {
            start_date = new Date(world.start_date);
            date_status = start_date >= now;

            if (date_status) {
                return true;
            }
        }

        if (world.dependency) {
            return !areDependenciesCompleted(world);
        }

        return false;
    };

    /*
     * Returns true if world is current.
     * @param {object} world
     * @return {Boolean} 
     */
    $scope.isWorldCurrent = function (world) {
        return (world.type === "normal") && !$scope.isWorldLocked(world) && !$scope.isWorldCompleted(world);
    };

    /**
     * Returns true if the world is visible.
     * @param  {object}  world The world
     * @return {Boolean}       true if the world is completed
     */
    $scope.isWorldInIndex = function (world) {
        return (world.visibility !== 'hidden');
    };

    /*
     * Returns the details for a given world id
     * @param {String} id
     * @return {object}  null if no details were found
     */
    function getWorld(id) {
        var worldObj = _.filter($scope.worlds, function (world) {
            return world.id === id ? world : null;
        });
        return worldObj[0];
    }

    /*
     * Returns true if the dependency for a world is met
     * @param {object} world
     * @return {object}
     */
    function areDependenciesCompleted (world) {
        var completed = true;
        if (world.dependency) {
            world.dependency.forEach(function (worldId) {
                completed = completed && $scope.isWorldCompleted(getWorld(worldId));
            });
        }
        return completed;
    }

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
     * @param {object} the challenge item
     * @return {Boolean}
     */
    $scope.isLocked = function (challenge) {
        var index = challenge.index,
            now = new Date(),
            start_date = challenge.start_date;

        if (start_date) {
            start_date = new Date(start_date);
            if (start_date >= now) {
                return true;
            }
        }
        return index > inWorldProgress.challengeNo;
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

    /*
     * Select a challenge and open challenge modal
     *
     * @param {Object} challenge
     * @return void
     */
    $scope.selectChallenge = function (challenge) {
        if ($scope.isLocked(challenge)) {
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
