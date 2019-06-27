var fs = require('fs'),
    path = require('path');

var contentPath = 'content',
    examplesPath = 'examples';

function getFileContent (file) {
    return fs.readFileSync(path.resolve(contentPath, file), 'utf8');
}

module.exports = {

    fileContent: function (file) {
        return getFileContent(file);
    },

    jsonContent: function (file) {
        return JSON.parse(getFileContent(file + '.json'));
    }

};