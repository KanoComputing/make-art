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
            'Move to the left by 80 - **type** `move -80`',
            'move -80',
            [
                [ 'move-to', { dx: -80, dy: 0 } ]
            ]
        ],
        [
            'Set the drawing color to white',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw an ellipse, it\'s like a stretched circle - **type** `ellipse 60, 40`',
            'ellipse 60, 40',
            [
                [ 'ellipse', { rx: 60, ry: 40 } ]
            ]
        ],
        [
            'Set the drawing color to black - **type** `color black`',
            'color black',
            [
                [ 'color', { color: palette.black } ],
            ]
        ],
        [
            'Draw a circle with a size of 10 - **type** `circle 10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
        [
            'Move to the right by 160 - **type** `move 160`',
            'move 160',
            [
                [ 'move-to', { dx: 160, dy: 0 } ]
            ]
        ],
        [
            'Set the drawing color to white again',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Now draw another ellipse with width 60 and height 40 -  **type** `ellipse 60, 40`',
            'ellipse 60, 40',
            [
                [ 'ellipse', { rx: 60, ry: 40 } ]
            ]
        ],
        [
            'Set the drawing color to black',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Finish it up by drawing a circle with a size of 10',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ]
    ])
};
