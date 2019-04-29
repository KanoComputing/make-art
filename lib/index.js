/*
 * Main Index module
 *
 * Import and initialise apps and all modules from here
 */

// Filters
import './filter/markdown';

import './filter/number';
import './filter/string';

// Router
import './routes';

// Service
import './service/email';
import './service/content';
import './service/social';

// Controllers
import './controller/challenges';
import './controller/challenge';
import './controller/playground';
import './controller/loadDialog';
import './controller/share';
import './controller/local-launch';
import './controller/promo-popup';
import './controller/feedback';

// Directives
import './directive/workspace';
import './directive/editor';
import './directive/display';
import './directive/progress-circle';
import './directive/export-modal';
import './directive/social';

import { app } from './app.js';

window.MakeArt = {
    app,
    bootstrap(host) {
        angular.bootstrap(host, ['draw']);
    },
};
