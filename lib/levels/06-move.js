module.exports = {
    title: 'MOVE THAT CURSOR',
    description: 'Continue your work in a new place',
    validate: function (code, steps) {
        return (
            steps.length === 2 &&
            steps[0].type === 'moveTo' &&
            Math.abs(steps[0].options.dx) &&
            Math.abs(steps[0].options.dy) &&
            steps[1].type === 'ellipse'
        );
    },
    code: '###\nAdd the \'move\' spell, it will change\nthe position of the circle\n###\n\ncircle 20',
    slides: require('./06-move.md'),
    startAt: 5
};
