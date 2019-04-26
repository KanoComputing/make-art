/*
 * Paths language module
 *
 * Collection of path commands
 */

import space from './space';

import session from '../session';
import utils from '../utils';

/*
 * Draw a line from current cursor position to absolute x and y coordinates
 *
 * @param {Number} x
 * @param {Number} y
 * @return void
 */
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

/*
 * Draw a line from current cursor position to relative x and y coordinates
 *
 * @param {Number} x
 * @param {Number}* y
 * @return void
 */
function line(x, y) {
    y = y || 0;

    lineTo(session.pos.x + x, session.pos.y + y);
}

/*
 * Set linecap to given type
 *
 * @param {String} type
 * @return void
 */
function lineCap(type) {
    session.ctx.lineCap = type;
    utils.record('line-cap', { type: type });
}

export default {
    lineTo  : lineTo,
    line    : line,
    lineCap : lineCap
};