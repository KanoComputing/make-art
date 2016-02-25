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

function select(name) {
    var inp,
        options = Array.prototype.slice.call(arguments);

    inp = window.document.createElement('select');
    inp.innerHTML = '';
    options.shift();
    inp.style.position = 'absolute';
    inp.style.top = session.pos.y + 'px';
    inp.style.left = session.pos.x + 'px';
    inp.setAttribute('id', 'select-' + id);
    options.forEach(function (option) {
        var o = window.document.createElement('option');
        o.innerHTML = option;
        o.value = option;
        inp.appendChild(o);
    });
    id++;
    window.document.getElementById('htmlDisplay').appendChild(inp);
    //inp.onchange = window.redraw();
    return {
        onChange: function (callback) {
            inp.onchange = callback;
        }
    };
}

function fromSelect(name) {
    return inputs[name].value;
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
    select: select,
    fromSelect: fromSelect,
    reset: reset,
};
