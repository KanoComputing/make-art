module.exports = {
    title: 'Draw!',
    validate: function (code) {
        return /^circle\s+[0-9]+$/.test(code);
    },
    code: '# Write the command here!',
    slides: require('./01-circle.md')

};