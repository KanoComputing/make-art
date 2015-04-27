/*
 * Markdown filters
 *
 * Registers markdown template filters to angular app
 */

var app = require('../app'),
    marked = require('marked');

var MARKDOWN_CONFIG = {
    renderer    : new marked.Renderer(),
    gfm         : true,
    tables      : true,
    breaks      : false,
    pedantic    : false,
    sanitize    : true,
    smartLists  : true,
    smartypants : false
};

// Markdown compiler setup
marked.setOptions(MARKDOWN_CONFIG);

/*
 * Returns unescaped HTML from an uncompiled markdown string
 *
 * @param {String} mdown
 * @return {String}
 */
app.filter('markdown', function ($sce) {
    return function (mdown) {
        return $sce.trustAsHtml(marked(mdown));
    };
});