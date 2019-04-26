/*
 * Text language module
 *
 * Collection of text commands
 */

import session from '../session';

import utils from '../utils';

/*
 * Set updated font with new key / val setting
 *
 * @param {String} key
 * @param {*} val
 * @return void
 */
function updateFont(key, val) {
    if (key) {
        session.settings.text[key] = val;
    }

    var size = session.settings.text.size * session.ratio,
        format = '';

    if (session.settings.text.italic) { format += 'italic '; }
    if (session.settings.text.bold) { format += 'bold '; }

    session.ctx.font = format + size + 'px ' + session.settings.text.font;
    session.ctx.textAlign = session.settings.text.align;
    session.ctx.textBaseline = session.settings.text.baseline;
}

/*
 * Set bold state (Defaults to true)
 *
 * @param {Boolean} state
 * @return void
 */
function bold(state) {
    state = typeof state === 'undefined' ? true : state;
    updateFont('bold', state);

    utils.record('text-bold', {
        state : state
    });
}

/*
 * Set italic state (Defaults to true)
 *
 * @param {Boolean} state
 * @return void
 */
function italic(state) {
    state = typeof state === 'undefined' ? true : state;
    updateFont('italic', state);

    utils.record('text-italic', {
        state : state
    });
}

/*
 * Set text size
 *
 * @param {Number} size
 * @return void
 */
function textSize(size) {
    updateFont('size', size);

    utils.record('text-size', {
        size : size
    });
}

/*
 * Set font family
 *
 * @param {String} font
 * @return void
 */
function fontFamily(font) {
    updateFont('font', font);

    utils.record('font-family', {
        font : font
    });
}

/*
 * Set text alignment
 *
 * @param {String} alignment
 * @return void
 */
function textAlign(alignment) {
    updateFont('align', alignment);

    utils.record('text-align', {
        alignment : alignment
    });
}

/*
 * Set text baseline mode
 *
 * @param {String} baseline
 * @return void
 */
function textBaseline(baseline) {
    baseline = baseline || 'alphabetic';
    updateFont('baseline', baseline);

    utils.record('text-baseline', {
        baseline : baseline
    });
}

/*
 * Set font mixed attributes
 *
 * @param {*..} attributes
 * @return void
 */
function font() {
    var val, i;

    for (i = 0; i < arguments.length; i += 1) {
        val = arguments[i];

        if (typeof val === 'number') {
            textSize(val);
        } else if (val === 'left', val === 'right', val === 'center') {
            textAlign(val);
        } else if (typeof val === 'string') {
            fontFamily(val);
        }
    }
}

/*
 * Draw text with current cursor position as origin and current text settings
 *
 * @param {String} font
 * @return void
 */
function text(val) {
    var x = session.pos.x * session.ratio,
        y = session.pos.y * session.ratio;

    session.ctx.fillStyle = session.settings.fill;
    session.ctx.fillText(val, x, y);

    utils.record('text', {
        value : val,
        x     : x,
        y     : y
    });
}

export default {
    updateFont   : updateFont,
    textSize     : textSize,
    fontFamily   : fontFamily,
    font         : font,
    text         : text,
    bold         : bold,
    italic       : italic,
    textAlign    : textAlign,
    textBaseline : textBaseline
};