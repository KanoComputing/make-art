var space = require('./space'),
    session = require('../session'),
    utils = require('../utils');

function lineTo(x, y) {
    var ratio = session.ratio;

    var pos = utils.parseCoordinates(x, y);

    x = pos.x;
    y = pos.y;

    space.moveTo(session.pos.x, session.pos.y);
    utils.startShape();
    session.ctx.moveTo(session.pos.x * ratio, session.pos.y * ratio);
    session.ctx.lineTo(x * ratio, y * ratio);
    utils.endShape();
    space.moveTo(x, y);
}

function line(x, y) {
    y = y || 0;

    lineTo(session.pos.x + x, session.pos.y + y);
}

function lineCap(type) {
    session.ctx.lineCap = type;
}

module.exports = {
    lineTo  : lineTo,
    line    : line,
    lineCap : lineCap
};