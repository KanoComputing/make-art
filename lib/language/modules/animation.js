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
    callback();
    session.animationRequestID = window.requestAnimationFrame(function () {
        animate(callback);
    });
}

module.exports = {
    animate     : animate
};
