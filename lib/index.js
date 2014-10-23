var app = require('./app');

// Filters
require('./filter/markdown');
require('./filter/number');

// Router
require('./routes');

// Controllers
require('./controller/main');
require('./controller/level');

// Directives
require('./directive/editor');
require('./directive/display');

window.app = app;