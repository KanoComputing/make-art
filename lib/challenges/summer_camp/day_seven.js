var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_seven',
    title       : 'Ghost gathering',
    description : 'A recent poll reported that 87 per cent of Chinese office workers believe in ghosts, and according to another report, 25 per cent of Britons say they have seen a ghost.',
    completion_text: 'Spooky! Can you make the ghost scarier? Maybe if it could say \"Boo!\"...',
    difficulty  : 2,
    img         : '/assets/summercamp/ch_pics/day_7.png',
    startAt     : 6,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Select a spooky color for the background - **type** `background darkpurple`',
            'background darkpurple',
            [
                [ 'background', { color: palette.darkpurple } ]
            ]
        ],
        [
            'Set the `stroke` to `0`, to avoid drawing lines',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Set the `color` to `white` for the ghost',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Now draw an ellipse for the ghost\'s body - **type** `ellipse 120, 140`',
            'ellipse 120, 140',
            [
                [ 'ellipse', { rx: 120, ry: 140 } ]
            ]
        ],
        [
            'Set the `color` to `black` for the eyes',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Move the cursor to draw the first eye - **type** `move -40, -50`',
            'move -40, -50',
            [
                [ 'move-to', { dx: -40, dy: -50 } ]
            ]
        ],
        [
            'Draw the eye with an ellipse - **type** `ellipse 20, 30`',
            'ellipse 20, 30',
            [
                [ 'ellipse', { rx: 20, ry: 30 } ]
            ]
        ],
        [
            'Set the `color` to `lightgray`',
            'color lightgray',
            [
                [ 'color', { color: palette.lightgray } ]
            ]
        ],
        [
            'Now draw a `circle` with a size of `5`',
            'circle 5',
            [
                [ 'ellipse', { rx: 5, isCircle: true } ]
            ]
        ],
        [
            'Looking good! Now move the cursor to the right for the second eye - **type** `move 30`',
            'move 30',
            [
                [ 'move-to', { dx: 30, dy: 0 } ]
            ]
        ],
        [
            'Set the `color` back to `black` for the second eye',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Draw the second eye with an ellipse - **type** `ellipse 20, 30`',
            'ellipse 20, 30',
            [
                [ 'ellipse', { rx: 20, ry: 30 } ]
            ]
        ],
        [
            'Set the `color` to `lightgray`',
            'color lightgray',
            [
                [ 'color', { color: palette.lightgray } ]
            ]
        ],
        [
            'Draw a `circle` with size `5`',
            'circle 5',
            [
                [ 'ellipse', { rx: 5, isCircle: true } ]
            ]
        ],
        [
            'Almost there! Set the `color` to `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Now move the cursor to the bottom - **type** `move -80, 150`',
            'move -80, 150',
            [
                [ 'move-to', { dx: -80, dy: 150 } ]
            ]
        ],
        [
            'Let\'s open a loop - **type** `for i in [ 1 .. 5 ]`',
            'for i in [ 1 .. 5 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '1..5' } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `45`',
            '    circle 45',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 5; i += 1) {
                    out.push([ 'ellipse', { rx: 45, isCircle: true } ]);
                }

                return out;
            }
        ],
        [
            'And move the cursor slightly to the right - **type** `move 45`',
            '    move 45',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 5; i += 1) {
                	out.push([ 'ellipse', { rx: 45, isCircle: true } ]);
                    out.push([ 'move-to', { dx: 45, dy: 0 } ]);
                }
                return out;
            },
        	{ override: true }
        ]
    ])
};