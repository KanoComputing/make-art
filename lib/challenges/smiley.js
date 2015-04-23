var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'smiley',
    title       : 'Your first face',
    description : 'Draw a face',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the color to yellow - **Type** `color yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Choose a thick black stroke - In a new line, **type** `stroke 20, black`',
            'stroke 20, black',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 20 } ]
            ],
        ],
        [
            'Draw a circle with a radius of 200 - In a new line, **type** `circle 200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Move left and up by 80 - In a new line, **type** `move -80, -80`',
            'move -80, -80',
            [
                [ 'move-to', { dx: -80, dy: -80 } ]
            ]
        ],
        [
            'Set the color to black - In a new line, **type** `color black`',
            'color black',
            [
                [ 'color', { color: palette.black} ]
            ]
        ],
        [
            'Draw a circle with a radius of 20 - In a new line, **type** `circle 20`',
            'circle 20',
            [
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ],
        [
            'Move right by 160 - In a new line, **type** `move 160`',
            'move 160',
            [
                [ 'move-to', { dx: 160, dy: 0 } ]
            ]
        ],
        [
            'Draw a circle with a radius of 20 - In a new line, **type** `circle 20`',
            'color black',
            [
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ],
        [
            'Move to the center and down - In a new line, **type** `moveTo \'center\', 270`',
            'moveTo \'center\', 270',
            [
                [ 'move-to', { x: 235, y: 270 } ]
            ]
        ],
        [
            'Draw an arc for the mouth - In a new line, **type** `arc 100, 1, 2`',
            'arc 100, 1, 2',
            [
                [ 'arc', { radius: 100, start: 1, end: 2 } ]
            ]
        ]
    ])
};
