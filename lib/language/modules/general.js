var session = require('../session'),
    space = require('./space'),
    setters = require('./setters'),
    text = require('./text'),
    paths = require('./paths'),
    utils = require('../utils');

function clear() {
    var width = session.width * session.ratio,
        height = session.height * session.ratio;

    session.ctx.clearRect(0, 0, width, height);

    if (session.settings.bg) {
        background(session.settings.bg);
    }

    utils.record('clear');
}

function background(color) {
    var width = session.width * session.ratio,
        height = session.height * session.ratio;

    color = utils.parseColor(color);
    session.ctx.globalCompositeOperation = 'destination-over';

    session.settings.bg = color;
    session.ctx.fillStyle = session.settings.bg;
    session.ctx.beginPath();
    session.ctx.rect(0, 0, width, height);
    session.ctx.closePath();
    session.ctx.fill();
    session.ctx.fillStyle = session.settings.fill;
    session.ctx.globalCompositeOperation = 'source-over';

    utils.record('background', { color: color });
}

function reset() {
    session.pos = utils.getCenter();

    session.settings = {
        bg     : null,
        fill   : '#333',
        stroke : {
            width : 1,
            color : '#222',
            cap   : 'butt'
        },
        text   : {
            size     : 25,
            font     : 'Bariol',
            align    : 'center',
            bold     : false,
            italic   : false,
            baseline : 'alphabetic'
        }
    };

    clear();

    space.moveTo(session.pos.x, session.pos.y);
    setters.strokeColor(session.settings.stroke.color);
    setters.strokeWidth(session.settings.stroke.width);
    paths.lineCap(session.settings.stroke.cap);
    text.updateFont();
    utils.record('reset');
}

function random(min, max, float) {
    var out;

    if (typeof min !== 'number' || typeof max !== 'number') {
        return Math.random();
    }

    out = Math.random() * (max - min) + min;

    if (float) { return out; }

    return Math.floor(out);
}

module.exports = {
    background : background,
    clear      : clear,
    reset      : reset,
    random     : random
};