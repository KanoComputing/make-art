var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'stickman',
    title       : 'Stickman',
    description : 'Draw a stickman using circles and lines',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Move towards the top of the canvas using `move 0, -130`',
            'move 0, -130',
            [
                [ 'move-to', { dy: -130 } ]
            ]
        ],
        [
            'Set the `stroke` to `black` with a size of `10`',
            'stroke black, 10',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 10 } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `50`',
            'circle 50',
            [
                [ 'ellipse', { rx: 50, isCircle: true } ]
            ]
        ],
        [
            'Move down, ***type*** `move 0, 50`',
            'move 0, 50',
            [
                [ 'move-to', { dx: 0, dy: 50 } ]
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
            'Move down, ***type*** `move 0, 150`',
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
        ]
    ])
};