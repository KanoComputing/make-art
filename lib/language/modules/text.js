var session = require('../session'),
    utils = require('../utils');

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

function bold(state) {
    state = typeof state === 'undefined' ? true : state;
    updateFont('bold', state);

    utils.record('text-bold', {
        state : state
    });
}

function italic(state) {
    state = typeof state === 'undefined' ? true : state;
    updateFont('italic', state);

    utils.record('text-italic', {
        state : state
    });
}

function textSize(size) {
    updateFont('size', size);

    utils.record('text-size', {
        size : size
    });
}

function fontFamily(font) {
    updateFont('font', font);

    utils.record('font-family', {
        font : font
    });
}

function textAlign(alignment) {
    updateFont('align', alignment);

    utils.record('text-align', {
        alignment : alignment
    });
}

function textBaseline(baseline) {
    baseline = baseline || 'alphabetic';
    updateFont('baseline', baseline);

    utils.record('text-baseline', {
        baseline : baseline
    });
}

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

function text(val) {
    var x = session.pos.x * session.ratio,
        y = session.pos.y * session.ratio;

    session.ctx.fillText(val, x, y);

    utils.record('text', {
        value : text,
        x     : x,
        y     : y
    });
}

module.exports = {
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