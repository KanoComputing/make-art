module.exports = {
    title: 'Draw',
    description: 'Draw a circle',
    validate: function (code, steps) {
        return (
            steps.length === 1 &&
            steps[0].type === 'ellipse' &&
            steps[0].options.rx > 1 &&
            steps[0].options.isCircle
        );
    },
    code: '# Write the spell just below this line\n',
    slides: require('./01-circle.md'),
    startAt: 2
};
