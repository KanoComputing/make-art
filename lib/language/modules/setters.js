var session = require('../session'),
    utils = require('../utils');

function background(color) {
    session.settings.bg = color;
}

function strokeColor(color) {
    session.settings.stroke.color = color;
    session.ctx.strokeStyle = color;
}

function strokeWidth(val) {
    session.settings.stroke.width = val;
    session.ctx.lineWidth = val * session.ratio;
}

function stroke() {
    var style = utils.parseLineStyle(arguments);

    if (style.color) { strokeColor(style.color); }
    if (style.width) { strokeWidth(style.width); }
}

function color(val) {
    session.ctx.fillStyle = val;
}

module.exports = {
    background  : background,
    strokeColor : strokeColor,
    strokeWidth : strokeWidth,
    stroke      : stroke,
    color       : color
};