var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'dots',
    title       : 'Dots Pattern',
    description : 'Create a fancy dots pattern using loops and circles!',
    code        : '',
    startAt     : 1,
    steps       : generate.fromSequence([
        [
            'Set the `background` to `red`',
            'background red',
            [
                [ 'background', { color: palette.red } ]
            ]
        ],
        [
            'Set the `stroke` to `0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Set the `color` to `yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now open a loop - **type** `for x in [ 0 .. 25 ]`',
            '\nfor x in [ 0 .. 25 ]',
            [
                [ 'for-loop', { iterator: 'x', range: '0..25' } ]
            ]
        ],
        [
            'Inside this loop, open a second loop - **type** `for y in [ 0 .. 25 ]`',
            '    for y in [ 0 .. 25 ]',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 26; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..25' } ]);
                }

                return out;
            }
        ],
        [
            'Move around, **type** `moveTo x * 20, y * 20`',
            '        moveTo x * 20, y * 20',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 26; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..25' } ]);

                    for (y = 0; y < 26; y += 1) {
                        out.push([ 'move-to', { x: x * 20, y: y * 20 } ]);
                    }
                }

                return out;
            },
            { override: true }
        ],
        [
            'Now for the dots - **type** `circle 6`',
            '        circle 6',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 26; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..25' } ]);

                    for (y = 0; y < 26; y += 1) {
                        out.push([ 'move-to', { x: x * 20, y: y * 20 } ]);
                        out.push([ 'ellipse', { rx: 6, isCircle: true } ]);
                    }
                }

                return out;
            },
            { override: true }
        ]
    ])
};