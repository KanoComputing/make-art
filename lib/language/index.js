/*
 * Language module
 *
 * Stateful, functional module that interprets the draw language
 */

import coffee from '../modules/coffeescript.js';

import session from './session';
import modules from './modules/index';
/*
 * Language module
 *
 * Stateful, functional module that interprets the draw language
 */

var config, ERROR_LOC_REGEX = /\s+at Object\.eval \((.+):(\d+):(\d+)\)/;

/*
 * Reset current drawing session
 *
 * @param {Object} settings
 * @return void
 */
function resetSession(settings) {
    "use strict";
    session.ctx = settings.ctx;
    session.width = settings.width;
    session.height = settings.height;
    session.ratio = settings.ratio || 1;
    session.steps = [];
    modules.general.reset();
}

/*
 * Evaluate draw code with given settings object, returns a error object
 *
 * containing debug info in case of failure
 * @param {String} code
 * @param {Object} settings
 * @return {Object|void}
 */
function run(code, settings) {
    var compiled;

    config = window.CONFIG;
    code = preCompile(code || '');

    // Reset session
    resetSession(settings);
    session.steps = [];

    // Attempt compiling coffeescript
    try {
        compiled = coffee.compile(code || '', { sourceMap: true, bare: true });
    } catch (err) {
        // Only warn in console if in debug mode
        if (config.DEBUG_LEVEL > 0 && !config.PRODUCTION) {
            console.warn('[ Compile error ] ' +  err);
        }

        return {
            message : err.message,
            type    : 'compilation'
        };
    }

    // Evaluate compiled JavaScript in build context
    try {
        evalInContext.bind({})(compiled.js);
    } catch (err) {
        // Trace back error location from compiled source map
        var jsLoc = getErrorLocation(err),
            coffeeLoc = jsLoc ? compiled.sourceMap.sourceLocation(jsLoc) : null;

        // Only warn in console if in debug mode
        if (config.DEBUG_LEVEL > 0 && !config.PRODUCTION) {
            console.warn('[ API error ] ' + err);
        }

        return {
            message : err.message,
            loc     : coffeeLoc,
            type    : 'execution'
        };
    }
}

/*
 * Precompile step - Cleans the code up
 *
 * @param {String} code
 * @return {String}
 */
function preCompile(code) {
    "use strict";
    code = code
    // Only use fat arrow (Block access to Window through `this`)
    .replace(/->/g, '=>')
    // Allow thin arrow on constructor functions
    .replace(/(constructor\s*\:[^\=]*)=>/g, function (match, start) {
        return start + '->';
    });

    return code;
}

/*
 * Dirty-parse error location though error stack
 *
 * @param {Error} err
 * @return [{Number}]
 */
function getErrorLocation(err) {
    "use strict";
    var trace,
        traceTop,
        x,
        y;

    trace = err.stack.split('\n').map(function (line) {
        return line.match(ERROR_LOC_REGEX);
    }).filter(function (match) {
        return match !== null;
    });

    if (trace.length > 0) {
        traceTop = trace[0];

        x = parseInt(traceTop[2], 10) - 1;
        y = parseInt(traceTop[3], 10) - 1;

        return [x, y];
    } else {
        return null;
    }
}

/*
 * Normalise and remove unnecessary bits from the code
 *
 * @param {String} code
 * @return {String}
 */
function strip(code) {
    "use strict";
    if (code) {
        code = code
        // Remove multi-line comments
        .replace(/###((.|\n)*)###/gm, '')
        // Remove inline comments
        .replace(/[^' ](#.*)|^[ ]*(#.*)($|\n)/g, '')
        // Remove spaces
        .replace(/^\s*[\r\n]/gm, '');
        // Trim spaces on edges
        return code.trim();
    }

    return code;
}


function checkValidity(code) {
    "use strict";
    var compiled;
    try {
        compiled = coffee.compile(code || '', { sourceMap: true });
        return true;
    } catch (err) {
        return false;
    }
}

/*
 * Build a contained context containing the draw language API and eval code
 *
 * inside it
 * @param {String} code
 * @return void
 */
function evalInContext(code) {
    /* jshint unused: false, evil: true */
    var m, c, value;

    const names = [];
    const values = [];
    // Loop through language modules and declare every property in this block
    for (m in modules) {
        if (modules.hasOwnProperty(m)) {

            for (c in modules[m]) {
                if (modules[m].hasOwnProperty(c)) {
                    // Declare property using eval
                    value = modules[m][c];

                    if (typeof value === 'function') {
                        value = value.bind({});
                    }

                    names.push(c);
                    values.push(value);
                }
            }
        }
    }

    // This function will evaluate a wrapper that returns a runner you can call with the modules values
    const fn = new Function(`
    return function(${names.join(',')}) {
        ${code}
    }`);

    const runner = fn()

    runner(...values);
}

export default {
    run   : run,
    strip : strip,
    checkValidity: checkValidity,
    evalInContext: evalInContext
};

export const cursorPosition = session.pos;
