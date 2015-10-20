/*
 * Paths language module
 *
 * Collection of path commands
 */

var space = require('./space'),
    session = require('../session'),
    utils = require('../utils');

/*
 * Adds the passed function the animation queue
 *
 * @param {Number} x
 * @param {Number} y
 * @return void
 */

function animate(callback) {
    session.ctx.clearRect(0, 0, session.width * session.ratio, session.height * session.ratio);
    callback();
    session.animationRequestID = window.requestAnimationFrame(function () {
        animate(callback);
    });
}

function setTimeout(callback, delay) {
    window.setTimeout(function () {
        requestAnimationFrame(callback);
    }, delay);
}

module.exports = {
    animate     : animate,
    setTimeout  : setTimeout
};
