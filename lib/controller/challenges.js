import app from '../app.js';


/*
 * Challenges Controller
 *
 * Controller for challenges selection screen
 */
app.controller('ChallengesController', ['$scope', '$rootScope', '$routeParams', '$location', 'contentService', '_config', 'activationService', function ($scope, $rootScope, $routeParams, $location, contentService, _config, activationService) {
    var routeWorldId = $routeParams.world,
        routeWorld;

    $scope.formData = {};
    $rootScope.inWorldProgress = {
        challengeNo: 1
    };

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
                //a world has been selected through the URL
                $rootScope.worlds.forEach(function (world) {
                    if (world.id === routeWorldId) {
                        routeWorld = world;
                    }
                });
            }

            if (activationService.tryToActivate()) {
                return;
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
            console.error("Couldn't load worlds " + err);

        });
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
                $rootScope.$broadcast('world-loaded', data);
            });
        }
    };

    $scope.unloadWorld = function () {
        $rootScope.selectedWorld = undefined;
        $rootScope.selectedWorldClass = undefined;
        $rootScope.inWorldProgress = {
            challengeNo: 1
        };
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
     * Returns true if the world is completed.
     * @param  {object}  world The world
     * @return {Boolean}       true if the world is completed
     */
    $scope.isWorldCompleted = function isWorldCompleted(world) {
        if (!$rootScope.progress || !$rootScope.progress.remaining) {
            return;
        }
        return $rootScope.progress.remaining[world.id].length === 0;
    }
    /**
     * Returns true if a world is locked;
     */
    $scope.isWorldLocked = function isWorldLocked(world) {
        // While progress is loading, let the normal challenges be locked
        if (!$rootScope.progress) {
            return world.type === 'normal';
        }
        const hasRemainingBasicChallenges = $rootScope.progress && $rootScope.progress.remaining && $rootScope.progress.remaining.basic.length !== 0;
        return world.id === 'medium' && hasRemainingBasicChallenges;
    }

    /*
     * Returns true if world is current.
     * @param {object} world
     * @return {Boolean}
     */
    $scope.isWorldCurrent = function isWorldCurrent(world) {
        if (!$rootScope.progress || !$rootScope.progress.remaining) {
            return;
        }
        return world.type === 'normal' && $rootScope.progress.remaining[world.id].length !== 0;
    }

    /*
     * Returns true if challenge is locked
     *
     * @param {object} the challenge item
     * @return {Boolean}
     */
    $scope.isLocked = function isLocked(ch) {
        if (!$rootScope.progress) {
            return true;
        }
        return $rootScope.progress.completed.indexOf(ch.id) === -1 && $rootScope.progress.remaining[$rootScope.selectedWorld.id].indexOf(ch.id) !== 0;
    }

    /*
     * Returns true if challenge is disabled
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCompleted = function isCompleted(ch) {
        if (!$rootScope.progress) {
            return false;
        }
        return $rootScope.progress.completed.indexOf(ch.id) !== -1;
    }

    /*
     * Returns true if challenge is last unlocked
     *
     * @param {Number} index
     * @return {Boolean}
     */
    $scope.isCurrent = function isCompleted(ch) {
        if (!$rootScope.progress) {
            return false;
        }
        return $rootScope.progress.remaining[$rootScope.selectedWorld.id] && $rootScope.progress.remaining[$rootScope.selectedWorld.id].indexOf(ch.id) === 0;
    }

    /*
     * Returns true if a certificate is achieved
     *
     * @param {Object} world
     * @return {Boolean}
     */
    $scope.isCertAchieved = contentService.world.isCertAchieved;
}]);
