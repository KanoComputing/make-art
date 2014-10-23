var app = require('../app'),
    marked = require('marked');

var config = {
    renderer    : new marked.Renderer(),
    gfm         : true,
    tables      : true,
    breaks      : false,
    pedantic    : false,
    sanitize    : true,
    smartLists  : true,
    smartypants : false
};

marked.setOptions(config);

app.filter('markdown', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(marked(input));
    };
});