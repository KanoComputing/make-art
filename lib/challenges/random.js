var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'random',
    title       : 'Random!',
    description : 'Not sure where to put something - theres a function for that!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            '**Type** `moveTo random(1, 500), random(1, 500)`',
            'moveTo random(1, 500), random(1, 500)',
            [
                [ 'move-to', function (options) {
                    return (
                        options.x > 0 && options.x <= 500 &&
                        options.y > 0 && options.y <= 500
                        );
                } ]
            ]
        ],
        [
            'Set the color to red - **type** `color red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Now let\'s draw a circle in a random place - **type** `circle 200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Set the color to green',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Now draw a circle with size 150',
            'circle 150',
            [
                [ 'ellipse', { rx: 150, isCircle: true } ]
            ]
        ],
        [
            'Set the color to yellow',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now draw a circle with size 100',
            'circle 100',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
        [
            'Set the color to blue',
            'color blue',
            [
                [ 'color', { color: palette.blue } ]
            ]
        ],
        [
            'Finish it of with a circle with a size of 50',
            'circle 50',
            [
                [ 'ellipse', { rx: 50, isCircle: true } ]
            ]
        ],
    
    ])
};
