var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'flag-japan',
    title       : 'Japanese flag',
    description : 'Draw a flag a learn the basics of drawing with code',
    code        : '',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Choose a white background - **type** `background white`',
            'background white',
            [
                [ 'background', { color: palette.white } ]
            ]
        ],
        [
            'Set the color to red - in a new line, **type** `color red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines - in a new line, **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Draw a circle with size 100 - in a new line **type** `circle 100`',
            'circle 100',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
    ])
};