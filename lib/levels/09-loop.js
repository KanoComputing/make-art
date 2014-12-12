module.exports = {
    title: 'Loops',
    description: 'Make things happen many times',
    validate: function (code, steps) {
        var circleCount = 0;

        for (var i = 0, len = steps.length; i < len; i++) {
            if (steps[i].type === 'ellipse') {
                circleCount++;
            }
        }
        return circleCount > 10;
    },
    code: '###\nIncrease the number of times\nthat the body is repeated\n###\n\n# Setup style\ncolor \'#3de03d\'\nstroke \'green\', 4\n\n# Draw body\n# Increase the number of iterations here\nfor i in [0 .. 2]\n    moveTo i * 30, 25 * Math.sin(i) + 250\n    circle 30\n\ndraw_face = () ->\n    spacing = 10\n    size = 5\n    color \'green\'\n    move -spacing, -spacing\n    circle size\n    move 2 * spacing, 0\n    circle size\n    move -spacing, 2 * spacing\n    arc 2 * size, 1, 2, close\n\ndraw_face() ',
    slides: require('./09-loop.md'),
    startAt: 1
};
