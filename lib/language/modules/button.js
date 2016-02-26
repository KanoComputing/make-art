/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    inputs = {};

function button(name, callback) {
    var inp;
    if (inputs[name]) {
        inp = inputs[name].el;
    } else {
        inp = window.document.createElement('button');
    }
    inp.onclick = callback;
    inp.ontap = callback;
    inp.innerHTML = name;
    inp.style.position = 'absolute';
    inp.style.top = session.pos.y + 'px';
    inp.style.left = session.pos.x + 'px';
    inp.style.zIndex = '1';
    if (inputs[name]) {
        return;
    }
    window.document.getElementById('htmlDisplay').appendChild(inp);
    inputs[name] = {
        el: inp
    };
}

module.exports = {
    button: button
};
