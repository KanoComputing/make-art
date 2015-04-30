var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'stickman',
    title       : 'Stickman',
    description : 'Draw a stickman using circles and lines',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the `stroke` to `black` with a size of `10`',
            'stroke black, 10',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 10 } ]
            ]
        ],
        [
            'Move up on the canvas, **type** `move 0, -50`',
            'move 0, 50',
            [
                [ 'move-to', { dx: 0, dy: -50 } ]
            ]
        ],
        [
            'Draw the stickman body: `line 0, 150`',
            'line 0, 150',
            [
                [ 'line', { dx: 0, dy: 150 } ]
            ]
        ],
        [
            'Draw the stickman left arm: `line -80, 120`',
            'line -80, 120',
            [
                [ 'line', { dx: -80, dy: 120 } ]
            ]
        ],
        [
            'Good, now with the right arm: `line 80, 120`',
            'line 80, 120',
            [
                [ 'line', { dx: 80, dy: 120 } ]
            ]
        ],
        [
            'Move down, **type** `move 0, 150`',
            'move 0, 150',
            [
                [ 'move-to', { dx: 0, dy: 150 } ]
            ]
        ],
        [
            'Draw the stickman left leg: `line -80, 120`',
            'line -80, 120',
            [
                [ 'line', { dx: -80, dy: 120 } ]
            ]
        ],
        [
            'Good, now with the right leg: `line 80, 120`',
            'line 80, 120',
            [
                [ 'line', { dx: 80, dy: 120 } ]
            ]
        ],
        [
            'Move to the top of the drawing, **type** `moveTo 250, 100`',
            'move 0, 50',
            [
                [ 'move-to', { x: 250, y: 100 } ]
            ]
        ],
        [
            'Now to draw a many sided shape - **type** `polygon -60, 40, -50, 100, 50, 100, 60, 40`',
            'polygon -60, 40, -50, 100, 50, 100, 60, 40, true',
            [
                [ 'polygon', { points: [
                    { x: 0, y: 0 },
                    { x: -60, y: 40 },
                    { x: -50, y: 100 },
                    { x: 50, y: 100 },
                    { x: 60, y: 40 }
                ] } ]
            ]
        ],

    ])
};
