"use strict";
module.exports = function (config) {
    return {
        auth        : require('./auth')(config),
        progress    : require('./progress')(config),
        server      : {},
        challengeIO : require('./challenge-io')(config),
        summercamp  : require('./summer-camp')(config),
        profile     : require('./userprofile')(config),
        questions   : require('./questions')(config)
    };
};
