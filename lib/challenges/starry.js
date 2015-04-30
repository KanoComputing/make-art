var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'starry-sky',
    title       : 'Starry sky',
    description : 'Code your own starry night sky using the random function!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the background to darkblue',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
            ]
        ],
        [
            'Now set the stroke to 0',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'And set the drawing color to yellow',
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
    ])
};
