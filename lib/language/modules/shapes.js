/*
 * Shapes language module
 *
 * Collection of shape commands
 */

import session from '../session';

import utils from '../utils';

/*
 * Draw a rectangle using current cursor position as origin
 *
 * @param {Number} width
 * @param {Number} height
 * @return void
 */
function rectangle(width, height) {
    utils.startShape();

    utils.record('rectangle', {
        x        : session.pos.x,
        y        : session.pos.y,
        width    : width,
        height   : height,
        isSquare : width === height
    });

    var x = session.pos.x * session.ratio,
        y = session.pos.y * session.ratio;

    width *= session.ratio;
    height *= session.ratio;

    session.ctx.rect(x, y, width, height);
    utils.endShape();
}

/*
 * Draw a square using current cursor position as origin
 *
 * @param {Number} size
 * @return void
 */
function square(size) {
    rectangle(size, size);
}

/*
 * Base function to draw an arc using current cursor position as origin, rx
 * and ry as x and y radiuses, start and end values ranging from 0 to 2,
 * close back for path creation.
 * This function is used as a base for other functions in this module
 *
 * @param {Number} rx
 * @param {Number} ry
 * @param {Number} start
 * @param {Number} end
 * @param {Boolean} close
 * @param {Boolean} back
 * @return void
 */
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


/*
 * Draw an ellipse using current cursor position as origin
 *
 * @param {Number} rx
 * @param {Number} ry
 * @return void
 */
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

/*
 * Simplified wrapper function to draw an arc
 *
 * @param {Number} radius
 * @param {Number} start
 * @param {Number} end
 * @param {Boolean} close
 * @return void
 */
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

/*
 * Draw a circle using current cursor position as origin
 *
 * @param {Number} radius
 * @return void
 */
function circle(radius) {
    ellipse(radius, radius);
}

/*
 * Draw a polygon using every two arguments as coordinates for a new point
 *
 * @param {Number} radius
 * @return void
 */
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

export default {
    rectangle : rectangle,
    square    : square,
    ellipse   : ellipse,
    circle    : circle,
    arc       : arc,
    polygon   : polygon
};