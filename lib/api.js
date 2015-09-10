/*
 * API module
 *
 * Exports appropriate core functionality API depending on OFFLINE env variable
 */

var offline = require('./api/offline/index');

module.exports = function (config) {
	var online = require('./api/online/index')(config);
	var api = config.OFFLINE ? offline : online;
	api.online = require('./api/online/world-api')(config);
	return api;
};