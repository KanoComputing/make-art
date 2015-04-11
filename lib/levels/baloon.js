var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'red-baloon',
    title       : 'Red Ballon',
    description : 'Draw a balloon floating in the air using polygons!',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the color to red - In a new line, **type** `color red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines - In a new line, *type* `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Draw a circle with a radius of 100 - In a new line, **type** `circle 100`',
            'circle 100',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
        [
            'Move vertically by 100 - In a new line, *type* `move 0, 100`',
            'move 0, 100',
            [
                [ 'move-to', { dx: 0, dy: 100 } ]
            ]
        ],
        [
            'Draw the knot - *Type* `polygon 15, 15, -15, 15`',
            'polygon 15, 15, -15, 15',
            [
                [ 'polygon', { points: [
                    { x: 0, y: 0 },
                    { x: 15, y: 15 },
                    { x: -15, y: 15 }
                ] } ]
            ]
        ],
        [
            'Move at the end of the knot - In a new line, *type* `move 0, 15`',
            'move 0, 15',
            [
                [ 'move-to', { dx: 0, dy: 15 } ]
            ]
        ],
        [
            'Choose a tick black stroke - In a new line, *type* `stroke black, 5`',
            'stroke black, 5',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 5 } ]
            ]
        ],
        [
            'Draw the line of the baloon thread - In a new line, *type* `line 0, 100`',
            'line 0, 100',
            [
                [ 'line', { dx: 0, dy: 100 } ]
            ]
        ]
    ])
};