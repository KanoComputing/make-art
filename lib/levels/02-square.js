module.exports = {
    title: 'Now with a square!',
    validate: function (code) {
        return /^square\s+[0-9]+$/.test(code);
    },
    code: ' ',
    slides: require('./02-square.md')
};