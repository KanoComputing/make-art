/*
 * Main Index module
 *
 * Import and initialise apps and all modules from here
 */

// Filters
import './filter/markdown.js';

import './filter/number.js';
import './filter/string.js';

// Router
import './routes.js';

// Service
import './service/email.js';
import './service/content.js';
import './service/social.js';
import './service/HandleActivation.js';

// Controllers
import './controller/challenges.js';
import './controller/challenge.js';
import './controller/playground.js';
import './controller/loadDialog.js';
import './controller/share.js';
import './controller/local-launch.js';

// Directives
import './directive/workspace.js';
import './directive/editor.js';
import './directive/display.js';
import './directive/progress-circle.js';
import './directive/export-modal.js';
import './directive/social.js';

import { app } from './app.js';


window.MakeArt = {
    app,
    bootstrap(host) {
        angular.bootstrap(host, ['draw']);
    },
};
