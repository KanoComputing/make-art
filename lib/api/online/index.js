"use strict";
import auth from './auth.js';
import progress from './progress.js';
import challengeIO from './challenge-io.js';
import summercamp from './summer-camp.js';
import profile from './userprofile.js';
import questions from './questions.js';
import mailer from './mailer.js';

export default function (config) {
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
