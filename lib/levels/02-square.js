module.exports = {
    title: 'Now with a square',
    description: 'You\'ve mastered the circle, now up the ante with a square',
    validate: function (code, steps) {
        return (
            steps.length === 1 &&
            steps[0].type === 'rectangle' &&
            steps[0].options.width > 1 &&
            steps[0].options.isSquare
        );
    },
    code: '###\nDo the same as previously, but use\nthe \'square\' spell this time\n###\n',
    startAt: 5,
    slides: require('./02-square.md')
};
