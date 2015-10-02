"use strict";
module.exports = function (cfg) {

    return {
        auth        : require('./auth'),
        progress    : require('./progress')(cfg),
        server      : require('./server'),
        challengeIO : require('./challenge-io'),
        sound       : require('./sound'),
        profile     : require('./userprofile')
    };
};
