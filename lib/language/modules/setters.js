var session = require('../session'),
    utils = require('../utils');

function strokeColor(color) {
    color = utils.parseColor(color);
    session.settings.stroke.color = color;
    session.ctx.strokeStyle = color;
    utils.record('strokeColor', { color: color });
}

function strokeWidth(val) {
    session.settings.stroke.width = val;
    session.ctx.lineWidth = val * session.ratio;
    utils.record('strokeWidth', { width: val });
}

function stroke() {
    var style = utils.parseLineStyle(arguments);
    if (style.color) { strokeColor(style.color); }
    if (typeof style.width !== 'undefined') { strokeWidth(style.width); }
}

function color(val) {
    val = utils.parseColor(val);
    session.ctx.fillStyle = val || 'transparent';
    utils.record('color', { color: val });
}

module.exports = {
    strokeColor : strokeColor,
    strokeWidth : strokeWidth,
    stroke      : stroke,
    color       : color,
    colour      : color
};