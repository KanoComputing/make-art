/*
 * Main Index module
 *
 * Import and initialise apps and all modules from here
 */

// Filters
import './filter/markdown.js';
import './filter/number.js';
import './filter/string.js';
import './filter/trust.js';

// Router
import './routes.js';

// Service
import './service/content.js';
import './service/HandleActivation.js';

// Controllers
import './controller/challenges.js';
import './controller/challenge.js';
import './controller/playground.js';
import './controller/share.js';

// Directives
import './directive/workspace.js';
import './directive/editor.js';
import './directive/display.js';
import './directive/progress-circle.js';
import './directive/export-modal.js';

import { app } from './app.js';


// window.onerror = function(message, file, line, col, error) {
//     console.error("Error occurred: " + error.message);
//     return true;
// };

window.MakeArt = {
    app,
    bootstrap(host) {
        angular.bootstrap(host, ['draw'], {
            strictDi: true
          });
    },
};
