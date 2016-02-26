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
        options = Array.prototype.slice.call(arguments),
        callback = typeof options[options.length - 1] === 'function' ? options.pop() : function () {};

    inp = window.document.createElement('select');
    inp.innerHTML = '';
    options.shift();
    inp.setAttribute('id', 'select-' + id);
    options.forEach(function (option) {
        var o = window.document.createElement('option');
        o.innerHTML = option;
        o.value = option;
        inp.appendChild(o);
    });
    id++;
    window.document.getElementById('htmlDisplay').appendChild(inp);
    var rect = inp.getBoundingClientRect();
    inp.style.position = 'absolute';
    inp.style.top = session.pos.y - (rect.height) + 'px';
    inp.style.left = session.pos.x - (rect.width / 2) + 'px';
    inp.onchange = function (e) {
        var target = e.target;
        console.log(target.options[target.selectedIndex].value);
        (callback || function () {}).call(inp, target.options[target.selectedIndex].value);
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
    select: select,
    reset: reset
};
