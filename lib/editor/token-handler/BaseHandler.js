"use strict";
/*
 * BaseHandler class
 *
 * Base class for token handlers used in editor - other token handler
 * constructors extend from this.
 *
 * A token handler is a small piece of UI used to handle value changes in
 * a code token - For example, a slider appearing on top of a number selected
 * while writing code, or a color picker when cursor is placed inside a color
 * token.
 */

var SPACING = 15,
    _ = require('lodash');

/*
 * BaseHandler constructor
 *
 * @class BaseHandler
 * @constructor
 * @param {ACEEditor} editor
 * @param {Object} token
 */
function BaseHandler(editor, token, $rootScope, $controller, $compile) {
    this.editor = editor;
    this.editorElement = this.editor.container;
    this.session = editor.getSession();
    this.token = token;
    this.token.el = this.getTokenElement();

    this.ng = {
        $rootScope  : $rootScope,
        $compile    : $compile,
        $controller : $controller
    };
}

/*
 * Init function called ater creation - Extend from here
 *
 * @return void
 */
BaseHandler.prototype.init = function () {
    // ...
};

/*
 * Open the handler, compile template, create element and scope, add to DOM
 *
 * @return void
 */
BaseHandler.prototype.open = function () {
    var template = this.getTemplate();
    this.scope = angular.extend(this.ng.$rootScope.$new());
    this.scope.class = this.class;
    this.scope.token = this.token;
    this.el = this.ng.$compile(angular.element(template))(this.scope)[0];
    this.el.style.display = 'none';
    document.body.appendChild(this.el);
    this.ng.$controller(this.init.bind(this), this);
    this.resize();
};

/*
 * Get class template wrapped in main token-handler template
 *
 * @return {String}
 */
BaseHandler.prototype.getTemplate = function () {
    return (
        '<div class="token-handler", ng-class="class">' +
            (this.template || '') +
        '</div>'
        );
};

/*
 * Resize handler, positions the element over token element
 *
 * @return void
 */
BaseHandler.prototype.resize = function () {
    // Next tick..
    setTimeout(function () {
        var bbox, tokenBbox, x, y;

        if (!this.el || !this.token.el) {
            return;
        }

        this.el.style.display = 'block';
        bbox = this.el.getBoundingClientRect();
        tokenBbox = this.token.el.getBoundingClientRect();
        x = tokenBbox.left + tokenBbox.width / 2 - bbox.width / 2 + document.body.scrollLeft;
        y = tokenBbox.top - bbox.height - SPACING + document.body.scrollTop;

        this.el.style.left = Math.floor(x) + 'px';
        this.el.style.top = Math.floor(y) + 'px';
    }.bind(this));
};

/*
 * Close the handler, remove the element
 *
 * @return void
 */
BaseHandler.prototype.close = function () {
    this.el.parentNode.removeChild(this.el);
};

/*
 * Get the element of current token in the editor
 *
 * @return {Object}
 */
BaseHandler.prototype.getTokenElement = function () {
    var lineElement = this.getLineElement(),
        token = this.token;

    if (lineElement.childNodes[this.token.index].nodeName === '#text') {
        this.token.index = _.findIndex(lineElement.childNodes, function (el, index) {
            return (el.innerText === token.value) && (index >= token.index);
        });
    }

    return lineElement.childNodes[this.token.index];
};

BaseHandler.prototype.getLineElement = function () {
    var lines = this.editor.container.querySelectorAll('.ace_text-layer .ace_line');
    return lines[this.token.line];
};

/*
 * Get an array containing all tokens found in current editor session
 *
 * @return [{Object}]
 */
BaseHandler.prototype.getAllTokens = function () {
    var i, lines = this.session.getValue().split('\n'),
        tokens = [];

    for (i = 0; i < lines.length; i += 1) {
        tokens = tokens.concat(this.session.getTokens(i));
    }

    return tokens;
};

module.exports = BaseHandler;
