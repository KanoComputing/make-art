var session = require('../session'),
    utils = require('../utils');

function moveTo(x, y) {
    x = x || 0;
    y = y || 0;

    var pos = utils.parseCoordinates(x, y);

    x = pos.x;
    y = pos.y;

    session.pos = { x: x, y: y };

    x = session.pos.x * session.ratio;
    y = session.pos.y * session.ratio;

    session.ctx.moveTo(x, y);
}

function move(x, y) {
    y = y || 0;
    moveTo(session.pos.x + x, session.pos.y + y);
}

module.exports = {
    moveTo : moveTo,
    move   : move
};