var coffee = require('coffee-script'),
    config = require('../core/config'),
    session = require('./session'),
    utils = require('./utils'),
    modules = {
        general : require('./modules/general'),
        paths   : require('./modules/paths'),
        setters : require('./modules/setters'),
        shapes  : require('./modules/shapes'),
        space   : require('./modules/space'),
        palette : require('./palette')
    };

function resetSession(settings) {
    session.ctx = settings.ctx;
    session.width = settings.width;
    session.height = settings.height;
    session.ratio = settings.ratio;
    session.steps = [];
    modules.general.reset();
}

function run(code, settings) {
    var compiled;

    resetSession(settings);
    session.steps = [];

    try {
        compiled = coffee.compile(code || '', {sourceMap: true});
    } catch (err) {
        if (config.DEBUG_LEVEL > 0 &&
            !config.PRODUCTION) {
            console.warn('[ Compile error ] ' +  err);
        }
        return {message: err.message};
    }

    try {
        evalInContext(compiled.js);
    } catch (err) {
        var js_loc = get_error_location(err),
            coffee_loc = compiled.sourceMap.sourceLocation(js_loc);

        if (config.DEBUG_LEVEL > 0 &&
            !config.PRODUCTION) {
            console.warn('[ API error ] ' + err);
        }
        return {message: err.message, loc: coffee_loc};
    }

    utils.drawCursor(session.pos);
}

function get_error_location(err) {
    var trace,
        trace_top;

    trace = err.stack.split('\n').map(function (line) {
        return line.match(/\s+at Object\.eval \((.+):(\d+):(\d+)\)/);
    }).filter(function (match) {
        return match !== null;
    });

    if (trace.length > 0) {
        trace_top = trace[0];
        return [parseInt(trace_top[2])-1, parseInt(trace_top[3])-1];
    } else {
        return [0, 0];
    }
}

function strip(code) {
    code = code.replace(/###((.|\n)*)###/gm, '');
    code = code.replace(/(#.*(\n|$))/g, '');
    code = code.replace(/^\s*[\r\n]/gm, '');

    return code.trim();
}

function evalInContext(code) {
    var m, c, module, i, command, value;

    for (m in modules) {
        if (modules.hasOwnProperty(m)) {

            for (c in modules[m]) {
                if (modules[m].hasOwnProperty(c)) {

                    value = modules[m][c];
                    eval('var ' + c + ' = value;', value);
                }
            }
        }
    }

    // for (i = 0; i < packages.length; i += 1) {
    //     pkg = packages[i];

    //     for (command in pkg) {
    //         value = pkg[command];

    //         if (pkg.hasOwnProperty(command)) {
    //             console.log('var ' + command + ' = value;', value);
    //             eval('var ' + command + ' = value;');
    //         }
    //     }
    // }

    eval(code);
}

module.exports = {
    run   : run,
    strip : strip
};
