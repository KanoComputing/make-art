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
            start_date;

        if (world.start_date) {
            start_date = new Date(world.start_date);
            return (start_date >= now);
        } else {
            return false;
        }
    };

    /*
     * Returns true if world is current.
     * @param {object} world
     * @return {Boolean} 
     */
    $scope.isWorldCurrent = function (world) {
        // Check the type of world
        // If it's a "normal" world, then, check the dependency
        if (world.type === "normal") {
            if (world.dependency.length) {
                return checkDependency(world);
            }
            else {
                // If the world has no dependency, then the basic world should be unlocked by default
                return true;
            }
        }

        if (world.type === "campaign") {
            // If it's a "campaign" world, then check the dependency and the start date, if any
            if (world.dependency.length) {
                return checkDependency(world);
            }
            else {
                // If the world has no dependency, then check if it has a "start_date"
                if (world.start_date && !world.dependency.length) {
                    // If the world has a start date, then check the difference
                    // between the start date and the current date
                    var now = new Date(),
                        start_date;

                    start_date = world.start_date;

                    return start_date >= now;
                }

                // If the world has no start_date, then return false
                return false;
            }
        }
        // If no condition above is met, then return false
        return false;
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
    function getWorld (id) {
        var worldObj = _.filter($scope.worlds, function (world) {
            return world.id === id ? world : null;
        });
        return worldObj;
    }

    /*
     * Returns true if the dependency for a world is met
     * @param {object} world
     * @return {object}
     */
    function checkDependency (world) {
        var dependency,
            progress,
            dependantWorld,
            worldPath = "worlds/";

        dependency = world.dependency[0];
        worldPath += dependency;
        // Get progress details for the dependency
        progress = getProgressGroup(dependency);
        // Get details of the dependant world
        dependantWorld = getWorld(dependency);

        return dependantWorld[0].challenges_num < progress.challengeNo;
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
