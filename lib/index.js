var app = require('./app');

// Filters
require('./filter/markdown');
require('./filter/number');

// Router
require('./routes');

// Controllers
require('./controller/main');
require('./controller/level');
require('./controller/playground');
require('./controller/docs');
require('./controller/challenge-menu-item');
require('./controller/export');
require('./controller/loadDialog');
require('./controller/examples');

// Directives

require('./directive/workspace');
require('./directive/editor');
require('./directive/display');

window.app = app;
