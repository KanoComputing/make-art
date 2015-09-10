var api, sdk;

module.exports = function (config) {
	sdk = require('kano-world-sdk')(config);
	api = sdk.api;

	api.add('getProfile', {
	    method : 'get',
	    route  : '/users/detail/:userId',
	    params  : ['userId']
	});

	return api;
};