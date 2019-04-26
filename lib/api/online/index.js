"use strict";
import auth from './auth';
import progress from './progress';
import challengeIO from './challenge-io';
import summercamp from './summer-camp';
import profile from './userprofile';
import questions from './questions';
import mailer from './mailer';

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
