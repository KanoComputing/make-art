var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'planet',
    title       : 'Planet painter',
    description : 'Code your own planet!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the background using a hex code - **type** `background \'#444444\'`',
            'color \'#444444\'',
            [
                [ 'background', { color: '#444444' } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Set the color to yellow',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now let\'s open a loop - **type** `for i in [ 0 .. 32 ]`',
            'for i in [ 0 .. 32 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0..32' } ]
            ]
        ],
        [
            'Draw a circle with a size of 5',
            '    circle 5',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 33; i += 1) {
                    out.push([ 'ellipse', { isCircle: true, rx: 5 } ]);
                }

                return out;
            }
        ],
        [
            'Now to set where they go -  **type** `moveTo (random 1, 500), (random 1, 500)`',
            '    moveTo (random 1, 500), (random 1, 500)',
            function () {
                var i = 0,
                    out = [];

                function validateMove(options) {
                    return (
                        options.x > 0 && options.x <= 500 &&
                        options.y > 0 && options.y <= 500
                        );
                }

                function validateStar(options) {
                    return (
                        options.isCircle &&
                        options.rx === 5
                        );
                }

                for (i = 0; i < 33; i += 1) {
                    out.push([ 'ellipse', validateStar ]);
                    out.push([ 'move-to', validateMove ]);
                }

                return out;
            },
            { override: true }
        ],
        [
            'Now, make sure you\'re out of the for look (not indented) and **type** `color purple`',
            'move 0, 100',
            [
                [ 'color', { color: palette.purple } ]
            ]
        ],
        [
            'Now move to 328, 300',
            'polygon 15, 15, -15, 15',
            [
                [ 'move-to', { x: 328, y: 300 } ]
            ]
        ],
        [
            'Set the color by **typing** `color setBrightness purple, -10`',
            'move 0, 15',
            [
                [ 'move-to', { dx: 0, dy: 15 } ]
            ]
        ],
        [
            'Choose a tick black stroke - In a new line, *type* `stroke black, 5`',
            'stroke black, 5',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 5 } ]
            ]
        ],
        [
            'Draw the line of the baloon thread - In a new line, *type* `line 0, 100`',
            'line 0, 100',
            [
                [ 'line', { dx: 0, dy: 100 } ]
            ]
        ]
    ])
};