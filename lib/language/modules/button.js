/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils')
    id = 0;

function createButton(name, callback) {
    var inp = window.document.createElement('button');
    inp.innerHTML = name;
    inp.setAttribute('id', 'button-' + id);
    id++;
    window.document.getElementById('htmlDisplay').appendChild(inp);
    var rect = inp.getBoundingClientRect(),
        pos = utils.scaleTo(session.pos.x, session.pos.y, session.size);
    inp.style.position = 'absolute';
    inp.style.top = pos.y - (rect.height) + 'px';
    inp.style.left = pos.x - (rect.width / 2) + 'px';
    inp.style.zIndex = '1';
    function onClick() {
        (callback || function () {}).call(inp);
    }
    inp.onclick = onClick;
    inp.ontap = onClick;
}

function reset() {
    for (var i = 0; i <= id; i++) {
        var el = document.getElementById('button-' + i);
        if (el) {
            document.getElementById('htmlDisplay').removeChild(el);
        }
    }
    id = 0;
}

module.exports = {
    createButton: createButton,
    reset: reset
};
