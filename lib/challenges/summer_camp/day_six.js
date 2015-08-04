var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_six',
    title       : 'Bonfire',
    description : 'Description of the bonfire balbalblalbalbalbalblalba',
    completion_text: 'Try adding stars, a circle of rocks to make it safer or even marshmallows!',
    difficulty  : 2,
    startAt     : 5,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'It\'s a dark night. Set the `background` color to `darkblue',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
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
            'Move the cursor to place the floor - **type** `moveTo 0, 300`',
            'moveTo 0, 300',
            [
                [ 'move-to', { x: 0, y: 300 } ]
            ]
        ],
        [
            'Set the `color` to `darkgreen`',
            'color darkgreen',
            [
                [ 'color', { color: palette.darkgreen } ]
            ]
        ],
        [
            'Draw the grass using a rectangle - **type** `rectangle 500, 200`',
            'rectangle 500, 200',
            [
                [ 'rectangle', { width: 500, height: 200 } ]
            ]
        ],
        [
            'Move the cursor to place the light casted by the fire - **type** `moveTo 270, 400`',
            'moveTo 270, 400',
            [
                [ 'move-to', { x: 270, y: 400 } ]
            ]
        ],
        [
            'Set the `color` to `green`',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Draw the light using an ellipse - **type** `ellipse 200, 30`',
            'ellipse 200, 30',
            [
                [ 'ellipse', { rx: 200, ry: 30 } ]
            ]
        ],
        [
            'We need some wood to feed the fire - **type** `moveTo 120, 390`',
            'moveTo 120, 390',
            [
                [ 'move-to', { x: 120, y: 390 } ]
            ]
        ],
        [
            'Set the stroke for the logs - **type** `stroke 25, brown`',
            'stroke 25, brown',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { width: 25 } ]
            ]
        ],
        [
            'Good, now draw the first log - **type** `line 270, 30`',
            'line 270, 30',
            [
                [ 'line', { dx: 270, dy: 30 } ]
            ]
        ],
        [
            'Move the cursor to place the second log - **type** `moveTo 430, 390`',
            'moveTo 430, 390',
            [
                [ 'move-to', { x: 430, y: 390 } ]
            ]
        ],
        [
            'Draw the second log - **type** `line -290, 30`',
            'line -290, 30',
            [
                [ 'line', { dx: -290, dy: 30 } ]
            ]
        ],
        [
            'Excellent! We are now ready to light the fire - **type** `moveTo 200, 400`',
            'moveTo 200, 400',
            [
                [ 'move-to', { x: 200, y: 400 } ]
            ]
        ],
        [
            'Our fire will be formed by 150 lines! - **type** `for i in [ 0 .. 150 ]`',
            'for i in [ 0 .. 150 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0..150' } ]
            ]
        ],
        [
            'Set the thickness and color of each line - **type** `stroke 10, \'rgba(255, \' + (i + 50) + \', 0, 0.3)`',
            '    stroke 10, \'rgba(255, \' + (i + 50) + \', 0, 0.3)',
            function () {
            	var out = [],
                    i;
                for (i = 0; i < 150; i += 1) {
                    out.push([ 'stroke-color', { color: 'rgba(255, ' + (i + 50) + ', 0, 0.3)' } ]);
                    out.push([ 'stroke-width', { width: 10 } ]);
                }
                return out;
            }
        ],
        [
            'Now draw the line - **type** `line 150 - i`',
            '    line 150 - i',
            function () {
            	var out = [],
                    i;
                for (i = 0; i < 150; i += 1) {
                    out.push([ 'stroke-color', { color: 'rgba(255, ' + (i + 50) + ', 0, 0.3)' } ]);
                    out.push([ 'stroke-width', { width: 10 } ]);
                    out.push([ 'line', { dx: 150 - i, dy: 0 } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Move the cursor for next line - **type** `move 0.5, -2`',
            '    move 0.5, -2',
            function () {
            	var out = [],
                    i;
                for (i = 0; i < 150; i += 1) {
                    out.push([ 'stroke-color', { color: 'rgba(255, ' + (i + 50) + ', 0, 0.3)' } ]);
                    out.push([ 'stroke-width', { width: 10 } ]);
                    out.push([ 'line', { dx: 150 - i, dy: 0 } ]);
                    out.push([ 'move', { x: 0.5, y: -2 } ]);
                }
                return out;
            },
            { override: true }
        ]
    ])
};