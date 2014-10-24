module.exports = {
    title: 'Lines!',
    validate: function (code) {
        return /^line\s+[0-9]+,\s*[0-9]+$/m.test(code);
    },
    code: ' ',
    slides: require('./03-line.md')
};