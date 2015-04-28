var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'medal',
    title       : 'Make a Medal',
    description : 'Code you\'re own winnders medal!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the stroke to red',
            'color red',
            [
                [ 'stroke-color', { color: palette.red } ]
            ]
        ],
        [
            'Set the stroke to 90',
            'stroke 0',
            [
                [ 'stroke-width', { width: 90 } ]
            ]
        ],
        [
            'Draw a line - **type** `line -100, -270`',
            'line -100, -270',
            [
                [ 'line', { dx: -100, dy: -270 } ]
            ]
        ],
        [
            'Draw a line - **type** `line 100, -270`',
            'line 100, -270',
            [
                [ 'line', { dx: 100, dy: -270 } ]
            ]
        ],
        [
            'Set the stroke to zero',
            'stroke black, 5',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Set the color to gold - **type** `color gold`',
            'color gold',
            [
                [ 'color', { color: palette.gold } ]
            ]
        ],
        [
            'Draw a circle with a size of 170 ',
            'circle 170',
            [
                [ 'ellipse', { rx: 170, isCircle: true } ]
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
            'Write something on the medal - **type** `text \'Winner\'`',
            'move 0, 15',
            [
                [ 'move-to', { dx: 0, dy: 15 } ]
            ]
        ]
    ])
};
