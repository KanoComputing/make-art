/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    data = require('./data'),
    id = 0,
    previousName;

function createChoice() {
    var inp,
        options = Array.prototype.slice.call(arguments),
        callback = typeof options[options.length - 1] === 'function' ? options.pop() : function () {};

    inp = window.document.createElement('select');
    inp.innerHTML = '';
    inp.setAttribute('id', 'select-' + id);
    options.forEach(function (option) {
        var o = window.document.createElement('option');
        o.innerHTML = option;
        o.value = option;
        inp.appendChild(o);
    });
    id++;
    window.document.getElementById('htmlDisplay').appendChild(inp);
    var rect = inp.getBoundingClientRect(),
        pos = utils.scaleTo(session.pos.x, session.pos.y, session.size);
    inp.style.position = 'absolute';
    inp.style.top = pos.y - (rect.height) + 'px';
    inp.style.left = pos.x - (rect.width / 2) + 'px';
    return {
        getValue: function () {
            return inp.options[inp.selectedIndex].value;
        }
    };
}

function reset() {
    for (var i = 0; i <= id; i++) {
        var el = document.getElementById('select-' + i);
        if (el) {
            document.getElementById('htmlDisplay').removeChild(el);
        }
    }
    id = 0;
}

module.exports = {
    createChoice: createChoice,
    reset: reset
};
