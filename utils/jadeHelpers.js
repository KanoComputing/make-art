var fs = require('fs'),
    path = require('path');

var contentPath = 'content',
    examplesPath = 'examples';

function getFileContent (file) {
    console.log('jadeHelpers.js => 1')
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