"use strict";
/*
 * API module
 *
 * Exports appropriate core functionality API depending on OFFLINE env variable
 */


module.exports = function (config) {
    var online = require('./api/online/index')(config),
        offline = require('./api/offline/index')(config),
        api = config.OFFLINE ? offline : online;

    api.online = require('./api/online/world-api')(config);
    return api;
};
