var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'blue-baloon',
    title       : 'Blue Ballon',
    description : 'Draw a balloon floating in the air using polygons!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the color to blue - **type** `color blue`',
            'color red',
            [
                [ 'color', { color: palette.blue } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Draw a circle with a size of 100',
            'circle 100',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
        [
            'Move vertically by 100 - **type** `move 0, 100`',
            'move 0, 100',
            [
                [ 'move-to', { dx: 0, dy: 100 } ]
            ]
        ],
        [
            'Draw the knot - **type** `polygon 15, 15, -15, 15`',
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
            'Move down a little more - **type** `move 0, 15`',
            'move 0, 15',
            [
                [ 'move-to', { dx: 0, dy: 15 } ]
            ]
        ],
        [
            'Choose a thick black stroke - **type** `stroke black, 5`',
            'stroke black, 5',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 5 } ]
            ]
        ],
        [
            'Draw the line of the baloon thread - **type** `line 0, 200`',
            'line 0, 200',
            [
                [ 'line', { dx: 0, dy: 200 } ]
            ]
        ]
    ])
};
