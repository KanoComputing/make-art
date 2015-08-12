var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_ten',
    title       : 'Take a pic!',
    short_title : 'Camera',
    icon_class  : 'challenge_camera',
    description : 'Text about photos',
    img         : '/assets/summercamp/ch_pics/day_10.png',
    completion_text: 'Extra stuff',
    difficulty  : 1,
    startAt     : 0,
    rewards     : null,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Set the `background` color to `blue`.',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Set the `stroke` to `0` for now, to avoid drawing the outline of the shapes.',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Move the cursor to place the camera in the center - **type** `moveTo 100, 150`',
            'moveTo 100, 150',
            [
                [ 'move-to', { x: 100, y: 150 } ]
            ]
        ],
        [
            'Set the `color` of the camera to `dimgray`.',
            'color dimgray',
            [
                [ 'color', { color: palette.dimgray } ]
            ]
        ],
        [
            'Now draw the body of the camera with a rectangle - **type** `rectangle 300, 200`',
            'rectangle 300, 200',
            [
                [ 'rectangle', { width: 300, height: 200 } ]
            ]
        ], 
        [
            'Move the cursor to draw the lense - **type** `move 150, 100`',
            'move 150, 100',
            [
                [ 'move-to', { dx: 150, dy: 100 } ]
            ]
        ],
        [
            'Set the `color` of the lens to `lightblue`.',
            'color lightblue',
            [
                [ 'color', { color: palette.lightblue } ]
            ]
        ],
        [
            'Set the outline of the lens with a `stroke` of `10` and `black` color.',
            'stroke 10, black',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { 'width': 10 } ]
            ]
        ],
        [
             'The lens is a `circle` with size `50`.',
             'circle 50',
            [
                 [ 'ellipse', { rx: 50, isCircle: true } ]
            ]
        ],
        [
            'Set the `color` to `lightgray` for the second half of the lens.',
            'color lightgray',
            [
                [ 'color', { color: palette.lightgray } ]
            ]
        ],
        [
            'Draw an arc that matches the top half of the lens - **type** `arc 50, 2, 1`',
            'arc 50, 2, 1',
            [
                [ 'arc', { radius: 50, start: 2, end: 1 } ]
            ]
        ],
        [
            'This camera needs a flash! Move the cursor to place it - **type** `move -30, -125`',
            'move -30, -125',
            [
                [ 'move-to', { dx: -30, dy: -125 } ]
            ]
        ],
        [
            'Draw the flash of the camera with a `rectangle` of size `60` by `20`.',
            'rectangle 60, 20',
            [
                [ 'rectangle', { width: 60, height: 20 } ]
            ]
        ], 
        [
            'Set the `stroke` back to `0`.',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Set the `color` of the flash to `lightblue`.',
            'color lightblue',
            [
                [ 'color', { color: palette.lightblue } ]
            ]
        ],
        [
            'Draw a polygon for the reflection on the flash - **type** `polygon 40, 0, 0, 20`',
            'polygon 40, 0, 0, 20',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 40, y: 0 },
                    { x: 0, y: 20 }
                ] } ]
            ]
        ],
        [
            'Only the button to shoot the picture is left - **type** `move 100, 10`',
            'move 100, 10',
            [
                [ 'move-to', { dx: 100, dy: 10 } ]
            ]
        ],
        [
            'Set the `color` of the button to `red`.',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw the button of the camera with a `rectangle` of size `50` by `15`.',
            'rectangle 50, 15',
            [
                [ 'rectangle', { width: 50, height: 15 } ]
            ]
        ], 
                [
            'One more detail! Move the cursor one last time - **type** `move 25, -20`',
            'move 25, -20',
            [
                [ 'move-to', { dx: 25, dy: -20 } ]
            ]
        ],
        [
            'Set the `color` to `yellow`.',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Set the `font` to `\'ComicSansMS\'` and size `30`.',
            'font \'ComicSansMS\', 30',
            [
                [ 'font-family', { font: 'ComicSansMS' } ],
                [ 'text-size', { size: '30' } ],
            ]
        ],
        [
            'Write some text - **type** `text \'Click!\'`',
            'text \'Click!\'',
            [
                [ 'text', { value: 'Click!' } ]
            ]
        ]
    ])
};
