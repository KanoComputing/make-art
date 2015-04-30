var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate'),
    colors = require('../language/modules/colors');

module.exports = {
    id          : 'gradient',
    title       : 'Rainbow gradient',
    description : 'Combine for loops and colors to make something magical!',
    code        : '',
    startAt     : 1,
    steps       : generate.fromSequence([
        [
            'Start by opening a for loop - **type** `for x in [ 0 .. 25 ]`',
            'for x in [ 0 .. 25 ]',
            [
                [  'for-loop', { iterator: 'x', range: '0..25' } ]
            ]
        ],
        [
            'Now lets open a second for loop inside - **type** `for y in [ 0 .. 25 ]`',
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
            'Let\'s rotate through the color spectrum - **type** `color rotate red, 10 * x + 10 * y`',
            '        color rotate red, 10 * x + 10 * y',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 26; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..25' } ]);

                    for (y = 0; y < 26; y += 1) {
                        out.push([ 'color', {
                            color : colors.rotate(palette.red, 10 * x + 10 * y)
                        } ]);
                    }
                }

                return out;
            },
            { override: true }
        ],
        [
            'Now we need to move every time we draw - **type** `moveTo 20 * x , 20 * y`',
            '        moveTo 20 * x , 20 * y',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 26; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..25' } ]);

                    for (y = 0; y < 26; y += 1) {
                        out.push([ 'color', {
                            color : colors.rotate(palette.red, 10 * x + 10 * y)
                        } ]);

                        out.push([ 'move-to', {
                            x :  x * 20,
                            y :  y * 20
                        } ]);
                    }
                }

                return out;
            },
            { override: true }
        ],
        [
            'Now for the shapes draw a square of size 20',
            '        square 20',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 26; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..25' } ]);

                    for (y = 0; y < 26; y += 1) {
                        out.push([ 'color', {
                            color : colors.rotate(palette.red, 10 * x + 10 * y)
                        } ]);

                        out.push([ 'move-to', {
                            x :  x * 20,
                            y :  y * 20
                        } ]);

                        out.push([ 'rectangle', {
                            width    : 20,
                            isSquare : true
                        } ]);
                    }
                }

                return out;
            },
            { override: true }
        ]
    ])
};
