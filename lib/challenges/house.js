var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'house',
    title       : 'House',
    description : 'Draw a cosy house!',
    code        : '',
    startAt     : 1,
    steps       : generate.fromSequence([
        [
            'Let\'s start with the sky! Set the background to blue',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Now set the `stroke` to a size of `0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Move to the left and up, **type** `move -150, -50`',
            'move -150, -50',
            [
                [ 'move-to', { dx: -150, dy: -50 } ]
            ]
        ],
        [
            'Now set the color to beige',
            'color beige',
            [
                [ 'color', { color: palette.beige } ]
            ]
        ],
        [
            'Now draw rectangle, **type** `rectangle 300, 200`',
            'rectangle 300, 200',
            [
                [ 'rectangle', { width: 300, height: 200 } ]
            ]
        ],
        [
            'Move to the right and up, **type** `move 150, -100`',
            'move 150, -100',
            [
                [ 'move-to', { dx: 150, dy: -100 } ]
            ]
        ],
        [
            'Set the color to darkred for the roof',
            'color darkred',
            [
                [ 'color', { color: palette.darkred } ]
            ]
        ],
        [
            'Now let\'s draw the roof, **type** `polygon 170, 100, -170, 100`',
            'polygon 170, 100, -170, 100',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 170, y: 100 },
                    { x: -170, y: 100 }
                ] } ]
            ]
        ],
        [
            'Move to the left and down, **type** `move -250, 300`',
            'move -250, 300',
            [
                [ 'move-to', { dx: -250, dy: 300 } ]
            ]
        ],
        [
            'Now set the color to green for the grass',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Draw a rectangle for the grass, with a size of 500, 100',
            'rectangle 500, 100',
            [
                [ 'rectangle', { width: 500, height: 100 } ]
            ]
        ],
        [
            'Move to the right and up, **type** `move 220, -80`',
            'move 220, -80',
            [
                [ 'move-to', { dx: 220, dy: -80 } ]
            ]
        ],
        [
            'Now set the color to brown for the wooden door',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw a rectangle for the door, with a size of 60, 80',
            'rectangle 60, 80',
            [
                [ 'rectangle', { width: 60, height: 80 } ]
            ]
        ],
        [
            'Set the color to aqua for the windows',
            'color aqua',
            [
                [ 'color', { color: palette.aqua } ]
            ]
        ],
        [
            'Move to the left and up, **type** `move -80, -80`',
            'move -80, -80',
            [
                [ 'move-to', { dx: -80, dy: -80 } ]
            ]
        ],
        [
            'Draw a square with a size of 50',
            'square 50',
            [
                [ 'rectangle', { width: 50, isSquare: true } ]
            ]
        ],
        [
            'Move to the right, **type** `move 170`',
            'move 170',
            [
                [ 'move-to', { dx: 170 } ]
            ]
        ],
        [
            'Finish it up with a square with a size of 50',
            'square 50',
            [
                [ 'rectangle', { width: 50, isSquare: true } ]
            ]
        ]
    ])
};