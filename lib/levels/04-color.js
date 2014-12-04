module.exports = {
    title: 'Colors',
    description: 'Brighten up your life with colors',
    validate: function (code, steps) {
        return (
            steps.length === 2 &&
            steps[0].type === 'color' &&
            steps[0].options.color &&
            steps[1].type == 'ellipse'
        );
    },
    code: '###\nAdd the color spell before the circle\nDon\'t forget to wrap the color in speech marks\n###\n\n\ncircle 200',
    slides: require('./04-color.md'),
    startAt: 6
};
