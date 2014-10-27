var space = require('./space'),
    session = require('../session'),
    utils = require('../utils');

function lineTo(x, y) {
    var ratio = session.ratio;

    var pos = utils.parseCoordinates(x, y),
        from = {
            x : session.pos.x,
            y : session.pos.y
        };

    x = pos.x;
    y = pos.y;

    space.moveTo(session.pos.x, session.pos.y, false);
    utils.startShape();
    session.ctx.moveTo(from.x * ratio, from.y * ratio);
    session.ctx.lineTo(x * ratio, y * ratio);
    utils.endShape();

    utils.record('line', {
        xa    : from.x,
        ya    : from.y,
        xb    : x,
        yb    : y,
        dx    : x - from.x,
        dy    : y - from.y,
        style : session.settings.stroke
    });
}

function line(x, y) {
    y = y || 0;

    lineTo(session.pos.x + x, session.pos.y + y);
}

function lineCap(type) {
    session.ctx.lineCap = type;
    utils.record('lineCap', { type: type });
}

module.exports = {
    lineTo  : lineTo,
    line    : line,
    lineCap : lineCap
};