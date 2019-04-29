"use strict";

import auth from './auth.js';
import progressFactory from './progress.js';
import server from './server.js';
import challengeIO from './challenge-io.js';
import sound from './sound.js';
import profile from './userprofile.js';

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
