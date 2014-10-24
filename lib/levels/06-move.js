module.exports = {
    title: 'Move that cursor!',
    validate: function (code) {
        return /^\n*move\s+[0-9]*\,\s*[0-9]*\n+(.*)$/m.test(code);
    },
    code: '###\nAdd the \'move\' spell, it will change\nthe position of the circle\n###\n\ncircle 20',
    slides: require('./06-move.md'),
    startAt: 5
};