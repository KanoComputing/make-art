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
            'Choose a blue background - **Type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Set the color to yellow - In a new line, **type** `color yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
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
            'Move on top towards the left - In a new line, *type* `moveTo 150`',
            'moveTo 150',
            [
                [ 'move-to', { x: 150, y: 0 } ]
            ]
        ],
        [
            'Draw the first rectangle - In a new line, *type* `rectangle 50, 500`',
            'rectangle 50, 500',
            [
                [ 'rectangle', { width: 50, height: 500 } ]
            ]
        ],
        [
            'Move on the left towards the top - In a new line, *type* `moveTo 0, 150`',
            'moveTo 0 , 150',
            [
                [ 'move-to', { x: 0, y: 150 } ]
            ]
        ],
        [
            'Draw the second rectangle - In a new line, *type* `500, 50`',
            'rectangle 500, 50',
            [
                [ 'rectangle', { width: 500, height: 50 } ]
            ]
        ]
    ])
};