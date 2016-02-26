/*
 * Text language module
 *
 * Collection of text commands
 */

var session = require('../session'),
    utils = require('../utils'),
    id = 0;

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
function createText(val) {
    return textWithOpts(val, {
        font: session.settings.text.font,
        size: session.settings.text.size,
        color: session.settings.fill,
        bold: session.settings.text.bold,
        italic: session.settings.text.italic,
        pos: {
            x: session.pos.x,
            y: session.pos.y
        },
        centered: true
    });
}

function textWithOpts(val, opts) {
    val = val.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;');
    opts.pos = utils.scaleTo(opts.pos.x, opts.pos.y, session.size);
    var label = document.createElement('label');
    label.style.fontFamily = opts.font;
    label.style.fontSize = opts.size + 'px';
    label.style.color = opts.color;
    label.style.wordBreak = 'break-all';
    if (opts.bold) {
        label.style.fontWeight = 'bold';
    }
    if (opts.italic) {
        label.style.fontStyle = 'italic';
    }
    label.setAttribute('id', 'text-' + id);
    if (opts.animate) {
        function nextLetter(text, i) {
            if (i>=text.length) {
                return;
            }
            var t = text.substr(0, i);
            label.innerHTML = t;
            setTimeout(function () {
                nextLetter(text, i+1);
            }, 10);
        }
        nextLetter(val, 0);
    } else {
        label.innerHTML = val;
    }
    document.getElementById('htmlDisplay').appendChild(label);
    var rect = label.getBoundingClientRect();
    label.style.position = 'absolute';
    var x = opts.pos.x,
        y = opts.pos.y;
    if (opts.centered) {
        x -= (rect.width / 2);
        y -= (rect.height);
    }
    label.style.top = y + 'px';
    label.style.left = x + 'px';
    id++;
    return {
        setText: function (val) {
            label.innerHTML = val;
        }
    };
}

function dump(val) {
    var s = val;
    if (typeof val === 'object') {
        s = JSON.stringify(val);
    }
    return textWithOpts(s, {
        font: 'monospace',
        size: 55,
        color: 'green',
        pos: {
            x: 0,
            y: 0
        },
        centered: false,
        animate: true
    });
}

function dumpJSON(val) {
    var s = val;
    if (typeof val === 'object') {
        s = JSON.stringify(val, null, '\t');
    }
    return textWithOpts(s, {
        font: 'monospace',
        size: 30,
        color: 'green',
        pos: {
            x: 0,
            y: 0
        },
        centered: false
    });
}

function reset() {
    for (var i = 0; i <= id; i++) {
        var el = document.getElementById('text-' + i);
        if (el) {
            document.getElementById('htmlDisplay').removeChild(el);
        }
    }
    id = 0;
}

module.exports = {
    updateFont   : updateFont,
    textSize     : textSize,
    fontFamily   : fontFamily,
    font         : font,
    createText         : createText,
    bold         : bold,
    italic       : italic,
    textAlign    : textAlign,
    textBaseline : textBaseline,
    reset        : reset,
    dump        : dump,
    dumpJSON        : dumpJSON
};
