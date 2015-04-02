var BaseHandler = require('./BaseHandler');

function ColorHandler() {
    BaseHandler.apply(this, arguments); // Call super
}

// Extend from BaseHandler
ColorHandler.prototype = Object.create(BaseHandler.prototype);

module.exports = ColorHandler;