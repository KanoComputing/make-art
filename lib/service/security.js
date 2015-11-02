"use strict";
var app = require('../app'),
    _ = require('lodash');

app.factory('securityService', function ($rootScope) {
	function isChallengeLocked (challenge) {
		var index = challenge.index,
            now = new Date(),
            start_date = challenge.start_date;

        if (start_date) {
            start_date = new Date(start_date);
            if (start_date > now) {
                return true;
            }
        }
        
        return index > $rootScope.inWorldProgress.challengeNo;
	}

	function isChallengeCurrent (challenge) {
		return challenge.index === $rootScope.inWorldProgress.challengeNo;
	}

	function isChallengeCompleted (challenge) {
		return challenge.index < $rootScope.inWorldProgress.challengeNo;
	}

	function isWorldLocked (world) {
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
	}

	function isWorldCurrent (world) {
		return (world.type === "normal") && isWorldLocked(world) && !isWorldCompleted(world);
	}

	function isWorldCompleted (world) {
		var progress = getProgressGroup(world.id);
        if (progress.challengeNo > world.challenges_num) {
            return true;
        }
        return false;
	}

    function areDependenciesCompleted (world) {
        var completed = true;
        if (world.dependency) {
            world.dependency.forEach(function (worldId) {
                completed = completed && isWorldCompleted(getWorldFromId(worldId));
            });
        }
        return completed;
    }

    function getWorldFromId (id) {
    	var worldObj = _.filter($rootScope.worlds, function (world) {
            return world.id === id ? world : null;
        });
        return worldObj[0];
    }

    function getProgressGroup(worldId) {
        var progressGroup = $rootScope.progress.groups[worldId];

        if (!progressGroup) {
            progressGroup = {challengeNo: 1};
            $rootScope.progress.groups[worldId] = progressGroup;
        }

        return progressGroup;
    }

	return {
		challenge: {
			isLocked	: isChallengeLocked,
			isCurrent	: isChallengeCurrent,
			isCompleted	: isChallengeCompleted
		},
		world: {
			isLocked	: isWorldLocked,
			isCurrent	: isWorldCurrent,
			isCompleted	: isWorldCompleted
		},
		progress: {
			get 		: getProgressGroup
		}
	};
});
