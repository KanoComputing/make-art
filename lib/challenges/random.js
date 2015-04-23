var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'random',
    title       : 'Random!',
    description : 'Not sure where to put something - theres a function for that!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            '***Type*** `moveTo (random 0, stage.width), (random 0, stage.height)`',
            'stroke gray, 3',
            [
                [ 'move-to' ]
            ]
        ],
        [
            'Set the color to red - ***type*** `color red`',
            'circle 200',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Now let\s draw a circle in a random place - ***type*** `circle 200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Set the color to red - ***type*** `color green`',
            'circle 200',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Now let\s draw a circle in a random place - ***type*** `circle 150`',
            'circle 200',
            [
                [ 'ellipse', { rx: 150, isCircle: true } ]
            ]
        ],
        [
            'Set the color to red - ***type*** `color yellow`',
            'circle 200',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now let\s draw a circle in a random place - ***type*** `circle 100`',
            'circle 200',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
        [
            'Set the color to red - ***type*** `color blue`',
            'circle 200',
            [
                [ 'color', { color: palette.blue } ]
            ]
        ],
        [
            'Now let\s draw a circle in a random place - ***type*** `circle 50`',
            'circle 200',
            [
                [ 'ellipse', { rx: 50, isCircle: true } ]
            ]
        ],
    
    ])
};
