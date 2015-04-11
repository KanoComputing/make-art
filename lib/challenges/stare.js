var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'stare',
    title       : 'Stare in the dark',
    description : 'Draw a pair of staring eyes in the dark',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : generate.fromSequence([
        [

            'Set the background to black - **Type** `background black`',
            'background black',
            [
                [ 'background', { color: palette.black } ]
            ],
        ],
        [
            'Move to the left by 80 - In a new line, **type** `move -80`',
            'move -80',
            [
                [ 'move-to', { dx: -80, dy: 0 } ]
            ]
        ],
        [
            'Choose a white color: In a new line, **type** `color white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw an ellipse - In a new line, **type** `ellipse 60, 40`',
            'ellipse 60, 40',
            [
                [ 'ellipse', { rx: 60, ry: 40 } ]
            ]
        ],
        [
            'Choose a black color - In a new line, **type** `color black`',
            'color black',
            [
                [ 'color', { color: palette.black } ],
            ]
        ],
        [
            'Draw an circle with a radius of 10 - In a new line, **type** `circle 10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
        [
            'Move to the right by 80 - In a new line, **type** `move 160`',
            'move 160',
            [
                [ 'move-to', { dx: 160, dy: 0 } ]
            ]
        ],
        [
            'Choose a white color - In a new line, **type** `color white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw an ellipse: **In a new line, type** `ellipse 60, 40`',
            'ellipse 60, 40',
            [
                [ 'ellipse', { rx: 60, ry: 40 } ]
            ]
        ],
        [
            'Choose a black color: **In a new line, type** `color black`',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Draw an circle with a radius of 10: **In a new line, type** `circle 10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ]
    ])
};