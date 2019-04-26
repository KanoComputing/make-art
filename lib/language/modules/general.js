/*
 * General language module
 *
 * Collection of generic core commands
 */

import session from '../session';

import space from './space';
import setters from './setters';
import text from './text';
import paths from './paths';
import utils from '../utils';

/*
 * Clear the stage from current drawing
 *
 * @return void
 */
function clear() {
    var width = session.width * session.ratio,
        height = session.height * session.ratio;

    session.ctx.clearRect(0, 0, width, height);

    if (session.settings.bg) {
        background(session.settings.bg);
    }

    utils.record('clear');
}

/*
 * Set a background color
 *
 * @param {String} color
 * @return void
 */
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
    session.ctx.globalCompositeOperation = 'source-over';

    utils.record('background', { color: color });
}

/*
 * Reset session settings to default and clear the stage
 *
 * @return void
 */
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

/*
 * Get a random number between two numbers, rounded to an integer unless
 * float attribute is set to true
 *
 * @param {Number}* min
 * @param {Number}* max
 * @param {Boolena}* float
 * @return {Number}
 */
function random(min, max, float) {
    var out;

    if (typeof min !== 'number' || typeof max !== 'number') {
        return Math.random();
    }

    out = Math.random() * (max - min) + min;

    if (float) { return out; }

    return Math.floor(out);
}

/*
 * Record a variable declaration 
 * 
 * @param {String} the var name
 * @param {String} the value of the var
 * @return void
 */
function recordVar(name, value) {
    utils.record('var', {
        name: name, 
        value: value
    });
}

/*
 * Records a direct function call 
 * 
 * @param {String} the function name
 * @param {String} the actual params
 * @return void
 */
function recordFunc(name, params) {
    utils.record('func', {
        name: name, 
        params: params
    });
}

/*
 * Record a forloop execution
 * 
 * @param {String} iterator
 * @param {String} range
 * @return void
 */
function recordForLoop(iterator, range) {
    utils.record('for-loop', {
        iterator : iterator,
        range    : range.replace(/\s/g, '')
    });
}

export default {
    background    : background,
    clear         : clear,
    reset         : reset,
    random        : random,
    recordForLoop : recordForLoop,
    recordVar     : recordVar,
    recordFunc    : recordFunc

};