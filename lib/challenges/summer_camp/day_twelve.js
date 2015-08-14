var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_twelve',
    title       : 'Lights on!',
    short_title : 'Flashlight',
    icon_class  : 'challenge_flashlight',
    description : 'flashlight info',
    img         : '/assets/summercamp/ch_pics/day_12.png',
    completion_text: 'More flashlight',
    difficulty  : 1,
    startAt     : 0,
    rewards     : null,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'It\'s getting dark outside! Set the `background` color to `darkblue`',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
            ]
        ],
        [
            'Set the `stroke` to `0`, we won\'t need it for this challenge',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Move the cursor to place our flashlight - **type** `moveTo 200, 200`',
            'moveTo 200, 200',
            [
                [ 'move-to', { x: 200, y: 200 } ]
            ]
        ],
        [
            'Set the `color` of the flashlight to `dimgray`',
            'color dimgray',
            [
                [ 'color', { color: palette.dimgray } ]
            ]
        ],
        [
            'Draw the head of the flashlight with a rectangle - **type** `rectangle 100, 50`',
            'rectangle 100, 50',
            [
                [ 'rectangle', { width: 100, height: 50 } ]
            ]
        ],
        [
            'Now move the cursor down to draw the neck - **type** `move 0, 50`',
            'move 0, 50',
            [
                [ 'move-to', { dx: 0, dy: 50 } ]
            ]
        ],
        [
            'Set the `color` of this piece to `gray`',
            'color gray',
            [
                [ 'color', { color: palette.gray } ]
            ]
        ],
        [
            'Draw a polygon - **type** `polygon 20, 40, 80, 40, 100, 0`',
            'polygon 20, 40, 80, 40, 100, 0',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 20, y: 40 },
                    { x: 80, y: 40 },
                    { x: 100, y: 0 }
                ] } ]
            ]
        ],
        [
            'Exciting! Now move the cursor down to draw the body - **type** `move 20, 40`',
            'move 20, 40',
            [
                [ 'move-to', { dx: 20, dy: 40 } ]
            ]
        ],
        [
            'Set the `color` of the body to `darkgray`',
            'color darkgray',
            [
                [ 'color', { color: palette.darkgray } ]
            ]
        ],
        [
            'Draw the body of the flashlight with a `rectangle` `60` by `200`',
            'rectangle 60, 200',
            [
                [ 'rectangle', { width: 60, height: 200 } ]
            ]
        ],
        [
            'The only thing missing now is a ON/OFF button. Set the `color` to `dimgray`',
            'color dimgray',
            [
                [ 'color', { color: palette.dimgray } ]
            ]
        ],
        [
            'Now move the cursor down to place the button - **type** `move 30, 50`',
            'move 30, 50',
            [
                [ 'move-to', { dx: 30, dy: 50 } ]
            ]
        ],
        [
            'Draw an ellipse where the button will be located - **type** `ellipse 10, 30`',
            'ellipse 10, 30',
            [
                [ 'ellipse', { rx: 10, ry: 30 } ]
            ]
        ],
        [
            'Set the `color` of the button to `red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw the button with an ellipse - **type** `ellipse 10, 20`',
            'ellipse 10, 20',
            [
                [ 'ellipse', { rx: 10, ry: 20 } ]
            ]
        ],
        [
            'You have turned on the light! Set the color of the beam  - **type** `color \"rgba(255, 255, 0, 0.8)\"`',
            'color \"rgba(255, 255, 0, 0.8)\"',
            [
                [ 'color', { color: 'rgba(255, 255, 0, 0.8)' } ]
            ]
        ],
        [
            'Place the beam in front of the flashlight - **type** `move -50, -140`',
            'move -50, -140',
            [
                [ 'move-to', { dx: -50, dy: -140 } ]
            ]
        ],
        [
            'Draw the beam of light with a polygon - **type** `polygon 100, 0, 180, -300, -80, -300`',
            'polygon 100, 0, 180, -300, -80, -300',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 100, y: 0 },
                    { x: 180, y: -300 },
                    { x: -80, y: -300 }
                ] } ]
            ]
        ]
    ])
};
