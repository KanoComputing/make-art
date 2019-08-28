"use strict";
import app from '../app.js';
import i18n from '../i18n.js';

var config = window.CONFIG;

app.factory('contentService', ['$http', '$q', '$rootScope', '_config', function ($http, $q, $rootScope, _config) {
    function getWorlds() {
        var defer = $q.defer(),
            url = i18n.getChallengeLocalePath(_config.UI_ROOT, config.CHALLENGES_URL) + "/index.json";
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            defer.resolve(response.data.worlds);
        }, function errorCallback(response) {
            defer.reject(response);
        });
        return defer.promise;
    }

    function getWorld(contentUrl) {
        var defer = $q.defer(),
            url = i18n.getChallengeLocalePath(_config.UI_ROOT, config.CHALLENGES_URL) + "/" + contentUrl + "/index.json";
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {

            defer.resolve(response.data);

        }, function errorCallback(response) {

            defer.reject(response);

        });
        return defer.promise;
    }

    function getChallenge(world, challenge_id) {
        var defer = $q.defer(),
            url = i18n.getChallengeLocalePath(_config.UI_ROOT, config.CHALLENGES_URL) + "/worlds/" + world + "/" + challenge_id + ".json";
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            defer.resolve(response.data);
        }, function errorCallback(response) {
            defer.reject(response);
        });
        return defer.promise;
    }

    function getWorldById(id) {
        var worldObj = $rootScope.worlds.filter(function (world) {
            return world.id === id ? world : null;
        });
        return worldObj[0];
    }

    return {
        challenge: {
            get: getChallenge,
        },
        world: {
            get: getWorld,
            getById: getWorldById,
            getAll: getWorlds,
        },
    };
}]);
