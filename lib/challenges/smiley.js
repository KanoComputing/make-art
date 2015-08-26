var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'smiley',
    title       : 'Your first face',
    description : 'Draw a face',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the drawing color to yellow - **type** `color yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Choose a thick black stroke - **type** `stroke black, 20`',
            'stroke black, 20',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ]
            ],
        ],
        [
            'Draw a circle with a size of 200',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Move left and up by 80 - **type** `move -80, -80`',
            'move -80, -80',
            [
                [ 'move-to', { dx: -80, dy: -80 } ]
            ]
        ],
        [
            'Set the drawing color to black',
            'color black',
            [
                [ 'color', { color: palette.black} ]
            ]
        ],
        [
            'Draw a circle with a radius of 20',
            'circle 20',
            [
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ],
        [
            'Move right by 160 - **type** `move 160`',
            'move 160',
            [
                [ 'move-to', { dx: 160, dy: 0 } ]
            ]
        ],
        [
            'Draw another circle with a size of 20',
            'circle 20',
            [
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ],
        [
            'Move to the center and down - In a new line, **type** `moveTo 250, 270`',
            'moveTo 250, 270',
            [
                [ 'move-to', { x: 250, y: 270 } ]
            ]
        ],
        [
            'An arc is part of a cirlce, we can draw one as the mouth - **type** `arc 100, 1, 2`',
            'arc 100, 1, 2',
            [
                [ 'arc', { radius: 100, start: 1, end: 2 } ]
            ]
        ]
    ])
};
