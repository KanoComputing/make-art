var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'stare',
    title       : 'Stare in the dark',
    description : 'Draw a pair of staring eyes in the dark',
    startAt     : 2,
    steps       : generate.fromSequence([
        [

            'Set the background to black',
            'background black',
            [
                [ 'background', { color: palette.black } ]
            ],
        ],
        [
            'Move to the left by 80 - **type** `move -80, 0`',
            'move -80',
            [
                [ 'move-to', { dx: -80, dy: 0 } ]
            ]
        ],
        [
            'Set the color to white',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw an ellipse (like a stretched circle) - **type** `ellipse 60, 40`',
            'ellipse 60, 40',
            [
                [ 'ellipse', { rx: 60, ry: 40 } ]
            ]
        ],
        [
            'Set the color to black',
            'color black',
            [
                [ 'color', { color: palette.black } ],
            ]
        ],
        [
            'Draw an circle of size 10 - **type** `circle 10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
        [
            'Move to the right by 80 - **type** `move 160, 0`',
            'move 160',
            [
                [ 'move-to', { dx: 160, dy: 0 } ]
            ]
        ],
        [
            'Set the color to white - **type** `color white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw another ellipse - **type** `ellipse 60, 40`',
            'ellipse 60, 40',
            [
                [ 'ellipse', { rx: 60, ry: 40 } ]
            ]
        ],
        [
            'Set the color to black',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Finish it off by drawing a circle of size 10',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ]
    ])
};
