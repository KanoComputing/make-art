/*
 * Setters language module
 *
 * Collection of setup commands
 */

import session from '../session';

import utils from '../utils';

/*
 * Set current session stroke color
 *
 * @param {String} color
 * @return void
 */
function strokeColor(color) {
    color = utils.parseColor(color);
    session.settings.stroke.color = color;
    session.ctx.strokeStyle = color;
    utils.record('stroke-color', { color: color });
}

/*
 * Set current session stroke width
 *
 * @param {Number} val
 * @return void
 */
function strokeWidth(val) {
    session.settings.stroke.width = val;
    session.ctx.lineWidth = val * session.ratio;
    utils.record('stroke-width', { width: val });
}

/*
 * Set current session mixed stroke attributes
 *
 * @param {*...} attributes
 * @return void
 */
function stroke() {
    var style = utils.parseLineStyle(arguments);
    if (style.color) { strokeColor(style.color); }
    if (typeof style.width !== 'undefined') { strokeWidth(style.width); }
}

/*
 * Set current session fill color
 *
 * @param {String} color
 * @return void
 */
function color(val) {
    val = utils.parseColor(val);
    session.settings.fill = val || 'transparent';
    utils.record('color', { color: val });
}

export default {
    strokeColor : strokeColor,
    strokeWidth : strokeWidth,
    stroke      : stroke,
    color       : color,
    colour      : color
};