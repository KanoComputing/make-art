var session = require('../session'),
    utils = require('../utils');

function rectangle(width, height) {
    utils.startShape();

    var x = session.pos.x * session.ratio,
        y = session.pos.y * session.ratio;

    width *= session.ratio;
    height *= session.ratio;

    session.ctx.rect(x, y, width, height);
    utils.endShape();
}

function square(size) {
    rectangle(size, size);
}

function ellipse(rx, ry) {
    utils.startShape();

    var x = session.pos.x * session.ratio,
        y = session.pos.y * session.ratio;

    rx *= session.ratio;
    ry *= session.ratio;

    var startingAngle = 0,
        endingAngle = 2 * Math.PI; // 360 degrees is equal to 2π radians

    session.ctx.save();
    session.ctx.translate(x, y);
    session.ctx.scale(rx, ry);
    session.ctx.arc(0, 0, 1, startingAngle, endingAngle, -1);
    session.ctx.restore();

    utils.endShape();
}

function circle(radius) {
    ellipse(radius, radius);
}

module.exports = {
    rectangle : rectangle,
    square    : square,
    ellipse   : ellipse,
    circle    : circle
};