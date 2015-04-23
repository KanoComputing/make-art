var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'flag-sweden',
    title       : 'Swedish flag',
    description : 'A flag challenge with two crossing rectangles!',
    code        : '',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Choose a blue background - in a new line **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Set the color to yellow - in a new line, **type** `color yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Move on top towards the left - **type** `moveTo 150, 0`',
            'moveTo 150',
            [
                [ 'move-to', { x: 150, y: 0 } ]
            ]
        ],
        [
            'Draw the first rectangle - **type** `rectangle 50, 470`',
            'rectangle 50, 470',
            [
                [ 'rectangle', { width: 50, height: 470 } ]
            ]
        ],
        [
            'Move to the top left - **type** `moveTo 0, 150`',
            'moveTo 0 , 150',
            [
                [ 'move-to', { x: 0, y: 150 } ]
            ]
        ],
        [
            'Draw the second rectangle - **type** `rectangle 470, 50`',
            'rectangle 470, 50',
            [
                [ 'rectangle', { width: 470, height: 50 } ]
            ]
        ]
    ])
};