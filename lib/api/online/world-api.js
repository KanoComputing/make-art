var sdk;

module.exports = function (config) {
	sdk = require('kano-world-sdk')(config);
	return sdk.api;
};