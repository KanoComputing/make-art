module.exports = function (config) {
	return {
	    auth        : require('./auth')(config),
	    progress    : require('./progress')(config),
	    server      : {},
	    challengeIO : require('./challenge-io')(config),
	    summercamp  : require('./summer-camp.js')(config),
	    profile  : require('./userprofile.js')(config)
	};
};