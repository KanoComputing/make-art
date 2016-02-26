/*
 * Text language module
 *
 * Collection of text commands
 */

var session = require('../session'),
    utils = require('../utils'),
    id = 0;

/*
 * Draw text with current cursor position as origin and current text settings
 *
 * @param {String} font
 * @return void
 */
function image(src, width, height) {
    var img = document.createElement('img'),
        pos = utils.scaleTo(session.pos.x, session.pos.y, session.size);
    img.style.position = 'absolute';
    img.style.top = pos.y + 'px';
    img.style.left = pos.x + 'px';
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    img.setAttribute('id', 'img-' + id);
    img.setAttribute('src', src);
    document.getElementById('htmlDisplay').appendChild(img);
    id++;
}

function reset() {
    for (var i = 0; i <= id; i++) {
        var el = document.getElementById('img-' + i);
        if (el) {
            document.getElementById('htmlDisplay').removeChild(el);
        }
    }
    id = 0;
}

module.exports = {
    image:image,
    reset        : reset
};
