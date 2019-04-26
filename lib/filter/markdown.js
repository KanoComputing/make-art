/*
 * Markdown filters
 *
 * Registers markdown template filters to angular app
 */

import app from '../app';

import 'marked';

var MARKDOWN_CONFIG = {
    renderer    : new window.marked.Renderer(),
    gfm         : true,
    tables      : true,
    breaks      : false,
    pedantic    : false,
    sanitize    : true,
    smartLists  : true,
    smartypants : false
};

// Markdown compiler setup
window.marked.setOptions(MARKDOWN_CONFIG);

/*
 * Returns unescaped HTML from an uncompiled markdown string
 *
 * @param {String} mdown
 * @return {String}
 */
app.filter('markdown', function ($sce) {
    return function (mdown) {
        return $sce.trustAsHtml(window.marked(mdown));
    };
});