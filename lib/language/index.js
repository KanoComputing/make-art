/*
 * Language module
 *
 * Stateful, functional module that interprets the draw language
 */

var coffee = require('coffee-script'),
    config,
    session = require('./session'),
    modules = require('./modules/index'),
    ERROR_LOC_REGEX = /\s+at Object\.eval \((.+):(\d+):(\d+)\)/;

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
    session.size = document.getElementById('htmlDisplay').getBoundingClientRect();
    session.steps = [];
    modules.general.reset();
    modules.text.reset();
    modules.select.reset();
    modules.image.reset();
    modules.button.reset();
    modules.input.reset();
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
        compiled.js = autoCallback(compiled.js);
        compiled.js = '(function (){' + compiled.js + '}).call(this)';
        console.log(compiled.js);
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

    module.exports.cursorPosition = session.pos;
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
    //.replace(/->/g, '=>')
    // Allow thin arrow on constructor functions
    .replace(/(constructor\s*\:[^\=]*)=>/g, function (match, start) {
        return start + '->';
    });

    return code;
}

function autoCallback (code) {
    var lines = code.split('\n'),
        leftHand = 'x',
        reg,
        output = [],
        asyncFuncs = [{
            name: 'getWeather',
            firstArg: false
        }];
    if (lines.length == 0) {
        return "";
    }

    (function () {
        for(var i = 0; i < lines.length; i++) {
            for (var j = 0; j < asyncFuncs.length; j++) {
                if (lines[i].indexOf(asyncFuncs[j].name) !== -1) {
                    reg = /^\s*([A-Za-z0-9_]+)\s*=/;
                    var res = lines[i].match(reg);
                    if (res && res[1]) {
                        leftHand = res[1];
                    }
                    lines[i] = lines[i].substr(0, lines[i].length - 2) + (asyncFuncs[j].firstArg ? '' : ',') + 'function(' + leftHand + '){\n' + autoCallback(lines.slice(i + 1).join('\n')) + '\n});'
                    output.push(lines[i]);
                    return;
                } else {
                    output.push(lines[i]);
                }
            }
        }
    })();
    return output.join('\n');
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

                    if (typeof value === 'function') {
                        value = value.bind({});
                    }

                    eval('var ' + c + ' = value;');
                }
            }
        }
    }

    eval(code);
}

module.exports = {
    run   : run,
    strip : strip,
    checkValidity: checkValidity,
    evalInContext: evalInContext
};
