"use strict";
var app = require("../app"),
    config = window.CONFIG;

app.factory('contentService', function ($http, $q) {
    var srv = {
        getWorlds: function () {
            var defer = $q.defer(),
            url = config.CHALLENGES_URL + "/index.json";
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {

                defer.resolve(response.data.worlds);
            }, function errorCallback(response) {
                defer.reject(response);
            });
            return defer.promise;
        },


        getWorld: function (contentUrl) {
            var defer = $q.defer(),
            url = config.CHALLENGES_URL + "/" + contentUrl + "/index.json";
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {

                defer.resolve(response.data);

            }, function errorCallback(response) {

                defer.reject(response);

            });
            return defer.promise;
        },


        getChallenge: function (world, challenge_id) {
            var defer = $q.defer(),
            url = config.CHALLENGES_URL + "/worlds/" + world + "/" + challenge_id + ".json";
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
    };
    return srv;
});
