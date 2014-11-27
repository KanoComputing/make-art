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
require('./controller/challenge-menu-item');
require('./controller/export');

// Directives
require('./directive/editor');
require('./directive/display');

window.app = app;