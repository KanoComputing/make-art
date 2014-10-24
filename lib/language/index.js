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
    moveTo = modules.space.moveTo,
    move = modules.space.move;

function resetSession(settings) {
    session.ctx = settings.ctx;
    session.width = settings.width;
    session.height = settings.height;
    session.ratio = settings.ratio;
    modules.general.reset();
}

function run(code, settings) {
    var compiled;

    resetSession(settings);

    try {
        compiled = coffee.compile(code);
    } catch (err) {
        if (config.DEBUG_LEVEL > 0) {
            console.warn('[ Compile error ] ' +  err);
        }
        return;
    }

    try {
        eval(compiled);
    } catch (err) {
        if (config.DEBUG_LEVEL > 0) {
            console.warn('[ API error ] ' + err);
        }
        return;
    }

    utils.drawCursor(session.pos);
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