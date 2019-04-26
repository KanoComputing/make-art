"use strict";
var auth = require('./auth');
var progress = require('./progress');
var challengeIO = require('./challenge-io');
var summercamp = require('./summer-camp');
var profile = require('./userprofile');
var questions = require('./questions');
var mailer = require('./mailer');

module.exports = function (config) {
    return {
        server      : {},
        auth        : auth(config),
        progress    : progress(config),
        challengeIO : challengeIO(config),
        summercamp  : summercamp(config),
        profile     : profile(config),
        questions   : questions(config),
        mailer      : mailer(config),
    };
};
