var session = require('../session'),
    space = require('./space'),
    setters = require('./setters'),
    paths = require('./paths'),
    utils = require('../utils');

function clear() {
    var width = session.width * session.ratio,
        height = session.height * session.ratio;

    session.ctx.clearRect(0, 0, width, height);
    session.ctx.fillStyle = session.settings.bg;
    session.ctx.beginPath();
    session.ctx.rect(0, 0, width, height);
    session.ctx.closePath();
    session.ctx.fill();
    session.ctx.fillStyle = session.settings.fill;
    utils.record('clear');
}

function reset() {
    session.pos = utils.getCenter();

    session.settings = {
        bg     : '#fff',
        fill   : '#333',
        stroke : { width: 1, color: '#222', cap: 'butt' },
    };

    clear();

    space.moveTo(session.pos.x, session.pos.y);
    setters.background(session.settings.bg);
    setters.strokeColor(session.settings.stroke.color);
    setters.strokeWidth(session.settings.stroke.width);
    paths.lineCap(session.settings.stroke.cap);
    utils.record('reset');
}

module.exports = {
    clear : clear,
    reset : reset
};