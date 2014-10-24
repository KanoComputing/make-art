module.exports = {
    title: 'Draw!',
    validate: function (code) {
        return /^circle\s+[0-9]+$/m.test(code);
    },
    code: '# Write the spell just below this line\n',
    slides: require('./01-circle.md'),
    startAt: 2
};