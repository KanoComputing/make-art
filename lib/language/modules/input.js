/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    id = 0;

function createInput(name) {
    var inp = window.document.createElement('input');
    inp.setAttribute('id', 'input-' + id);
    inp.setAttribute('type', 'text');
    window.document.getElementById('htmlDisplay').appendChild(inp);
    var rect = inp.getBoundingClientRect(),
        pos = utils.scaleTo(session.pos.x, session.pos.y, session.size);
    inp.style.position = 'absolute';
    inp.style.top = pos.y - (rect.height) + 'px';
    inp.style.left = pos.x - (rect.width / 2) + 'px';
    id++;
    return {
        getValue: function () {
            return inp.value;
        }
    };
}

function reset() {
    for (var i = 0; i <= id; i++) {
        var el = document.getElementById('input-' + i);
        if (el) {
            document.getElementById('htmlDisplay').removeChild(el);
        }
    }
    id = 0;
}

module.exports = {
    createInput: createInput,
    reset: reset
};
