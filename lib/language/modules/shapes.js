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

    utils.record('rectangle', {
        x        : x,
        y        : y,
        width    : width,
        height   : height,
        isSquare : width === height
    });
}

function square(size) {
    rectangle(size, size);
}

function drawArc(rx, ry, start, end, close, back) {
    utils.startShape();

    var x = session.pos.x * session.ratio,
        y = session.pos.y * session.ratio;

    rx *= session.ratio;
    ry *= session.ratio;

    var startingAngle = start * Math.PI,
        endingAngle = end * Math.PI; // 360 degrees is equal to 2π radians

    session.ctx.save();
    session.ctx.translate(x, y);
    session.ctx.scale(rx, ry);
    session.ctx.arc(0, 0, 1, startingAngle, endingAngle, -1);
    session.ctx.restore();

    utils.endShape(close, back);
}

function ellipse(rx, ry) {
    drawArc(rx, ry, 0, 2);

    utils.record('ellipse', {
        x        : session.pos.x,
        y        : session.pos.y,
        rx       : rx,
        ry       : ry,
        isCircle : rx === ry
    });
}

function arc(radius, start, end, close) {
    drawArc(radius, radius, start, end, close || false, close || false);

    utils.record('arc', {
        x      : session.pos.x,
        y      : session.pos.y,
        radius : radius,
        start  : start,
        end    : end
    });
}

function circle(radius) {
    ellipse(radius, radius);
}

function polygon() {
    var lastArg = arguments[arguments.length - 1],
        close = lastArg === true || lastArg === false ? lastArg : false,
        baseX = session.pos.x * session.ratio,
        baseY = session.pos.y * session.ratio,
        points = [];

    utils.startShape();
    session.ctx.save();
    session.ctx.lineTo(baseX, baseY);

    points.push({ x: 0, y: 0 });

    for (var i = 0; i < arguments.length; i += 2) {
        session.ctx.lineTo(
            baseX + arguments[i] * session.ratio,
            baseY + arguments[i + 1] * session.ratio
            );

        points.push({ x: arguments[i], y: arguments[i + 1] });
    }

    session.ctx.restore();

    utils.endShape(close);

    utils.record('polygon', { points: points });
}

module.exports = {
    rectangle : rectangle,
    square    : square,
    ellipse   : ellipse,
    circle    : circle,
    arc       : arc,
    polygon   : polygon
};