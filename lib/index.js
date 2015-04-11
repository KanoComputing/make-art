var app = require('./app');

/*
 * Main Index module
 *
 * Import and initialise apps and all modules from here
 */

// Filters
require('./filter/markdown');
require('./filter/number');

// Router
require('./routes');

// Controllers
require('./controller/main');
require('./controller/splash');
require('./controller/challenges');
require('./controller/challenge');
require('./controller/playground');
require('./controller/docs');
require('./controller/export');
require('./controller/loadDialog');
require('./controller/share');
require('./controller/examples');

// Directives

require('./directive/workspace');
require('./directive/editor');
require('./directive/display');
require('./directive/progress-circle');

window.app = app;