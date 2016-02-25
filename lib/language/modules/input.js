/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    inputs = {},
    previousName;

function input(name) {
    if (inputs[name]) {
        inputs[name].style.top = session.pos.y + 'px';
        inputs[name].style.left = session.pos.x + 'px';
        return;
    }
    var inp = window.document.createElement('input');
    inp.style.position = 'absolute';
    inp.style.top = session.pos.y + 'px';
    inp.style.left = session.pos.x + 'px';
    window.document.getElementById('htmlDisplay').appendChild(inp);
    inputs[name] = inp;
}

function fromInput(name) {
    return inputs[name].value;
}

module.exports = {
    input: input,
    fromInput: fromInput
};
