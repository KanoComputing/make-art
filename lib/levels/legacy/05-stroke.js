module.exports = {
    title: 'Stylish strokes',
    description: 'Make your borders stand out',
    validate: function (code, steps) {
        return (
            steps.length === 4 &&
            (steps[0].type === 'strokeColor' || steps[0].type === 'strokeWidth') &&
            (steps[1].type === 'strokeColor' || steps[1].type === 'strokeWidth') &&
            steps[2].type === 'color' &&
            steps[3].type === 'ellipse'
        );
    },
    code: '# Add stroke spell below this line\n\ncolor "red"\ncircle 200',
    slides: require('./05-stroke.md'),
    startAt: 2
};
