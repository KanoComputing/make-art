var coffee = require('coffee-script'),
    config = require('../core/config'),
    session = require('./session'),
    utils = require('./utils'),
    modules = require('./modules/index');

/*
 * Language module
 * Stateful, functional module that interprets the draw language
 */

var ERROR_LOC_REGEX = /\s+at Object\.eval \((.+):(\d+):(\d+)\)/;

/*
 * Reset current drawing session
 * @param {Object} settings
 * @return void
 */
function resetSession(settings) {
    session.ctx = settings.ctx;
    session.width = settings.width;
    session.height = settings.height;
    session.ratio = settings.ratio || 1;
    session.steps = [];
    modules.general.reset();
}

/*
 * Evaluate draw code with given settings object, returns a error object
 * containing debug info in case of failure
 * @param {String} code
 * @param {Object} settings
 * @return {Object|void}
 */
function run(code, settings) {
    var compiled;

    // Reset session
    resetSession(settings);
    session.steps = [];

    // Attempt compiling coffeescript
    try {
        compiled = coffee.compile(code || '', {sourceMap: true});
    } catch (err) {
        // Only warn in console if in debug mode
        if (config.DEBUG_LEVEL > 0 && !config.PRODUCTION) {
            console.warn('[ Compile error ] ' +  err);
        }

        return { message : err.message };
    }

    // Evaluate compiled JavaScript in build context
    try {
        evalInContext(compiled.js);
    } catch (err) {
        // Trace back error location from compiled source map
        var jsLoc = getErrorLocation(err),
            coffeeLoc = compiled.sourceMap.sourceLocation(jsLoc);

        // Only warn in console if in debug mode
        if (config.DEBUG_LEVEL > 0 && !config.PRODUCTION) {
            console.warn('[ API error ] ' + err);
        }

        return { message: err.message, loc: coffeeLoc };
    }

    utils.drawCursor(session.pos);
}

/*
 * Dirty-parse error location though error stack
 * @param {Error} err
 * @return [{Number}]
 */
function getErrorLocation(err) {
    var trace,
        traceTop;

    trace = err.stack.split('\n').map(function (line) {
        return line.match(ERROR_LOC_REGEX);
    }).filter(function (match) {
        return match !== null;
    });

    if (trace.length > 0) {
        traceTop = trace[0];

        var x = parseInt(traceTop[2], 10) -1,
            y = parseInt(traceTop[3], 10) - 1;

        return [ x, y ];
    } else {
        return [0, 0];
    }
}

/*
 * Normalise and remove unnecessary bits from the code
 * @param {String} code
 * @return {String}
 */
function strip(code) {
    code = code
    // Remove multi-line comments
    .replace(/###((.|\n)*)###/gm, '')
    // Remove inline comments
    .replace(/(#.*(\n|$))/g, '')
    // Remove spaces
    .replace(/^\s*[\r\n]/gm, '');
    // Trim spaces on edges
    return code.trim();
}

/*
 * Build a contained context containing the draw language API and eval code
 * inside it
 * @param {String} code
 * @return void
 */
function evalInContext(code) {
    /* jshint unused: false, evil: true */
    var stage = {
            width  : session.width,
            height : session.height
        },
        m, c, value;

    // Loop through language modules and declare every property in this block
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {

            for (c in modules[m]) {
                if (modules[m].hasOwnProperty(c)) {

                    // Declare property using eval
                    value = modules[m][c];
                    eval('var ' + c + ' = value;', value);
                }
            }
        }
    }

    eval(code);
}

module.exports = {
    run   : run,
    strip : strip
};
