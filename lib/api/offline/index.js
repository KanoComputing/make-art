"use strict";

import auth from './auth';
import progressFactory from './progress';
import server from './server';
import challengeIO from './challenge-io';
import sound from './sound';
import profile from './userprofile';

export default function (cfg) {
    return {
        auth,
        progress: progressFactory(cfg),
        server,
        challengeIO,
        sound,
        profile,
    };
};
