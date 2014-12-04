module.exports = {
    title: 'Lines',
    description: 'Connect the dots',
    validate: function (code, steps) {
        return (
            steps.length === 1 &&
            steps[0].type === 'line' &&
            steps[0].options.dx &&
            steps[0].options.dy
        );
    },
    code: '###\nDraw a line\n###\n\n',
    startAt: 5,
    slides: require('./03-line.md')
};
