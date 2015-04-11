module.exports = {
    title: 'Move that cursor',
    description: 'Continue your work in a new place',
    validate: function (code, steps) {
        return (
            steps.length === 3 &&
            steps[0].type === 'moveTo' &&
            Math.abs(steps[0].options.dx) &&
            Math.abs(steps[0].options.dy) &&
            steps[2].type === 'ellipse'
        );
    },
    code: '###\nAdd the \'move\' spell, it will change\nthe position of the circle\n###\n\ncolor "yellow"\ncircle 20',
    slides: require('./06-move.md'),
    startAt: 5
};
