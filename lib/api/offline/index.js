"use strict";

var auth = require('./auth');
var progressFactory = require('./progress');
var server = require('./server');
var challengeIO = require('./challenge-io');
var sound = require('./sound');
var profile = require('./userprofile');

module.exports = function (cfg) {
    return {
        auth,
        progress: progressFactory(cfg),
        server,
        challengeIO,
        sound,
        profile,
    };
};
