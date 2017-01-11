"use strict";
var api,
    app = require('../app');

/*
 * Challenges Controller
 *
 * Controller for challenges selection screen
 */

app.controller('ChallengesController', function ($scope, $rootScope, $routeParams, $location, $http, contentService) {
    var config = window.CONFIG,
        domain = window.location.hostname,
        domainCfg = (config.DOMAIN_CFG) ? config.DOMAIN_CFG[domain] : null,
        routeWorldId = $routeParams.world,
        routeWorld;

    api = $rootScope.api;
    $scope.formData = {};
    $rootScope.inWorldProgress = { challengeNo: 1 };

    init();

    /*
     * Initialise controller
     *
     * @return void
     */
    function init() {
        $scope.certModal = false;
        contentService.world.getAll().then(function gotWorlds(data) {
            $rootScope.worlds = data;
            if (routeWorldId) {
                //a world has  been selected through the URL
                $rootScope.worlds.forEach(function (world) {
                    if (world.id === routeWorldId) {
                        routeWorld = world;
                    }
                });
            }
            if (routeWorld && !$scope.isWorldLocked(routeWorld)) {
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


        if (!(domainCfg && domainCfg.hideShares)) {
            api.online.share.list({}, { app_name: 'kano-draw', limit: 19 })
            .then(function (res) {
                // Next tick..
                setTimeout(function () {
                    $scope.shares = res.body.entries;
                    $scope.$apply();
                });
            });
        }
    }

    /**
     * Loads all the information for a world
     * @param  {object} world the object that contains the world information
     */
    $scope.loadWorld = function (world) {
        var worldPath = "worlds/" + world.id;
        if (!$scope.isWorldLocked(world)) {
            contentService.world.get(worldPath).then(function (data) {
                $scope.challenges = data.challenges;
                $rootScope.selectedWorld = data;
                $rootScope.selectedWorldClass = $rootScope.selectedWorld.css_class;
                $rootScope.inWorldProgress = contentService.progress.get($rootScope.selectedWorld.id);
                $rootScope.$broadcast('world-loaded', data);
            });
        }
    };

    $scope.unloadWorld = function () {
        $rootScope.selectedWorld = undefined;
        $rootScope.selectedWorldClass = undefined;
        $rootScope.inWorldProgress = {challengeNo: 1};
        $location.path('/challenges');
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
     * Accept user email for Kano updates
     */
    $scope.submit = function () {
        var data;
        if (!validateEmail($scope.formData.email)) {
            $scope.success = '';
            $scope.error = 'Please enter a valid email address!';
            return;
        }
        $scope.error = '';
        data = $rootScope.selectedWorld.updateForm.field + '=' + $scope.formData.email;

        postEmail(data, formNotification, formNotification);
    };

    function formNotification() {
        $scope.error = '';
        $scope.success = 'Thank you for signing up!';
        $scope.formData.email = '';
        setTimeout(function () {
            $scope.success = '';
            $scope.$apply();
        }, 5000);
    }

    function postEmail(data, successCB, errorCB) {
        var req = {
            method  : 'POST',
            url     : $rootScope.selectedWorld.updateForm.url,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data    : data
        };

        $http(req).then(successCB, errorCB);
    }

    function validateEmail(email) {
        var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regExp.test(email);
    }


    /**
     * Returns the URL for a certificate for a specific user
     * @return {string} a url
     */
    $scope.getCertificateUrl = function () {
        var url = 'http://certificate.kano.me/' + $rootScope.selectedWorld.id + '/?name=';
        if ($rootScope.user) {
            url += $rootScope.user.username;
        }

        if (true && $scope.isCertAchieved($rootScope.selectedWorld)) {
            return url;
        }

        return '#0';
    };

    $scope.checkCertOnPi = function (e) {
        if ($rootScope.cfg.OFFLINE) {
            e.preventDefault();
            $scope.toggleCertModal();
        }
    };

    $scope.toggleCertModal = function () {
        if ($scope.certModal) {
            $scope.certModal = false;
        } else {
            $scope.certModal = true;
        }
    };

    /**
     * Returns true if the world is visible.
     * @param  {object}  world The world
     * @return {Boolean}       true if the world is completed
     */
    $scope.isWorldInIndex = contentService.world.isVisible;

    /**
     * Returns true if the world is completed.
     * @param  {object}  world The world
     * @return {Boolean}       true if the world is completed
     */
    $scope.isWorldCompleted = contentService.world.isCompleted;

    /**
    *Returns true if a world is locked;
    */
    $scope.isWorldLocked = contentService.world.isLocked;

    /*
     * Returns true if world is current.
     * @param {object} world
     * @return {Boolean}
     */
    $scope.isWorldCurrent = contentService.world.isCurrent;

    /*
     * Returns true if challenge is locked
     *
     * @param {object} the challenge item
     * @return {Boolean}
     */
    $scope.isLocked = contentService.challenge.isLocked;

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = contentService.challenge.isCompleted;

    /*
     * Returns true if challenge is last unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCurrent = contentService.challenge.isCurrent;

    /*
     * Returns true if a certificate is achieved
     *
     * @param {Object} world
     * @return {Boolean}
     */
    $scope.isCertAchieved = contentService.world.isCertAchieved;
});
