/*
 * Space language module
 *
 * Collection of spacial and movement commands
 */

import session from '../session';

import utils from '../utils';

/*
 * Move cursor to absolute x and y positions
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Boolean} record
 * @return void
 */
function moveTo(x, y, record) {
    record = typeof record === 'undefined' ? true : record;

    x = x || 0;
    y = y || 0;

    var pos = utils.parseCoordinates(x, y),
        dx = pos.x - session.pos.x,
        dy = pos.y - session.pos.y;

    x = pos.x;
    y = pos.y;

    session.pos = { x: x, y: y };

    if (record) {
        utils.record('move-to', {
            x  : x,
            y  : y,
            dx : dx,
            dy : dy
        });
    }

    x = session.pos.x * session.ratio;
    y = session.pos.y * session.ratio;

    session.ctx.moveTo(x, y);
}

/*
 * Move cursor by relative x and y amounts
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Boolean} record
 * @return void
 */
function move(x, y, record) {
    y = y || 0;
    moveTo(session.pos.x + x, session.pos.y + y, record);
}

export default {
    moveTo : moveTo,
    move   : move
};