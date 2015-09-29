"use strict";
module.exports = function (cfg) {
    var api = {
        loadWorlds: function (callback) {
            $http({
                method: 'GET',
                url: cfg.CHALLENGES_URL
            }).then(function successCallback(response) {
                console.log("Loaded a response");
                callback(response);
            }, function errorCallback(response) {
                callback(response, null);
            });
        }
    };
    return api;
};
