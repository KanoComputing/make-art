/*
 * API module
 *
 * Exports appropriate core functionality API depending on OFFLINE env variable
 */

var config = require('./core/config'),
    offline = require('./api/offline/index'),
    online = require('./api/online/index'),
    api = config.OFFLINE ? offline : online;

api.online = require('./api/online/world-api');

module.exports = api;