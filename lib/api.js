"use strict";
/*
 * API module
 *
 * Exports appropriate core functionality API depending on OFFLINE env variable
 */
var onlineFactory = require('./api/online/index');
var offlineFactory = require('./api/offline/index');
var worldApiFactory = require('./api/online/world-api');

module.exports = function (config) {
    var online = onlineFactory(config),
        offline = offlineFactory(config),
        api = config.OFFLINE ? offline : online;

    api.online = worldApiFactory(config);
    return api;
};
