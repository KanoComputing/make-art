/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils'),
    inputs = {},
    previousName;

function select(name) {
    var inp,
        options = Array.prototype.slice.call(arguments);
    if (inputs[name]) {
        inp = inputs[name].el;
        inputs[name].value = inp.value;
    } else {
        inp = window.document.createElement('select');
    }
    inp.innerHTML = '';
    options.shift();
    inp.style.position = 'absolute';
    inp.style.top = session.pos.y + 'px';
    inp.style.left = session.pos.x + 'px';
    options.forEach(function (option) {
        var o = window.document.createElement('option');
        o.innerHTML = option;
        o.value = option;
        inp.appendChild(o);
    });
    if (inputs[name]) {
        console.log(inputs[name].value);
        var opts = inp.options;
        for(var opt, j = 0; opt = opts[j]; j++) {
            if(opt.value == inputs[name].value) {
                inp.selectedIndex = j;
                break;
            }
        }
        return;
    }
    window.document.getElementById('htmlDisplay').appendChild(inp);
    inputs[name] = {
        el: inp,
        value: inp.value
    };
}

function fromSelect(name) {
    return inputs[name].value;
}

module.exports = {
    select: select,
    fromSelect: fromSelect
};
