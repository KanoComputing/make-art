var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_three',
    title       : 'Pitch your Tent',
    description : 'This a how-to',
    completion_text: 'Try adding more cool stuff BALBALBALBLALBALBLA',
    difficulty  : 1,
    startAt     : 2,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Draw a sunny day - **type** `background lightblue`',
            'background lightblue',
            [
                [ 'background', { color: palette.lightblue } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Move the cursor where the sun will be - **type** `moveTo 400, 50`',
            'moveTo 400, 50',
            [
                [ 'move-to', { x: 400, y: 50 } ]
            ]
        ],
        [
            'Set the `color` of the sun `yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Draw the sun with a circle - **type** `circle 40`',
            'circle 40',
            [
                [ 'ellipse', { rx: 40, isCircle: true } ]
            ]
        ],
        [
            'Move the cursor to draw some grass - **type** `moveTo 0, 350`',
            'moveTo 0, 350',
            [
                [ 'move-to', { x: 0, y: 350 } ]
            ]
        ],
        [
            'Set the `color` of the grass `green`',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Draw the grass using a rectangle - **type** `rectangle 500, 150`',
            'rectangle 500, 150',
            [
                [ 'rectangle', { width: 500, height: 150 } ]
            ]
        ],
        [
            'Excellent! Now we are ready to draw the tent - **type** `color red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Position the cursor on top of the grass - **type** `moveTo 100, 350`',
            'moveTo 100, 350',
            [
                [ 'move-to', { x: 100, y: 350 } ]
            ]
        ],
        [
            'Draw a triangle using `polygon` - **type** `polygon 150, -200, 300, 0`',
            'polygon 150, -200, 300, 0',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 150, y: -200 },
                    { x: 300, y: 0 }
                ] } ]
            ]
        ],
        [
            'We need the entrace now. Set the `color` to `darkred`',
            'color darkred',
            [
                [ 'color', { color: palette.darkred } ]
            ]
        ],
        [
            'Place the cursor on the tip of the tent - **type** `moveTo 200, 150`',
            'moveTo 200, 150',
            [
                [ 'move-to', { x: 200, y: 150 } ]
            ]
        ],
        [
            'Draw the entrance - **type** `polygon 30, 200, -30, 200`',
            'polygon 30, 200, -30, 200',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 30, y: 200 },
                    { x: -30, y: 200 }
                ] } ]
            ]
        ], 
    ])
};