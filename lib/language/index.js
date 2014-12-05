var coffee = require('coffee-script'),
    config = require('../core/config'),
    session = require('./session'),
    utils = require('./utils'),
    modules = {
        general : require('./modules/general'),
        paths   : require('./modules/paths'),
        setters : require('./modules/setters'),
        shapes  : require('./modules/shapes'),
        space   : require('./modules/space')
    };

var clear = modules.general.clear,
    reset = modules.general.reset,
    lineTo = modules.paths.lineTo,
    lineCap = modules.paths.lineCap,
    line = modules.paths.line,
    background = modules.setters.background,
    color = modules.setters.color,
    strokeColor = modules.setters.strokeColor,
    strokeWidth = modules.setters.strokeWidth,
    stroke = modules.setters.stroke,
    rectangle = modules.shapes.rectangle,
    square = modules.shapes.square,
    ellipse = modules.shapes.ellipse,
    circle = modules.shapes.circle,
    arc = modules.shapes.arc,
    polygon = modules.shapes.polygon,
    moveTo = modules.space.moveTo,
    move = modules.space.move;

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
        if (config.DEBUG_LEVEL > 0) {
            console.warn('[ Compile error ] ' +  err);
        }
        return;
    }

    try {
        eval(compiled.js);
    } catch (err) {
        var js_loc = get_error_location(err),
            coffee_loc = compiled.sourceMap.sourceLocation(js_loc);

        if (config.DEBUG_LEVEL > 0) {
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
        return match != null;
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

module.exports = {
    run   : run,
    strip : strip
};
