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
            'Start by opening a for loop - **Type** `for x in [ 0 .. 32 ]`',
            'for x in [ 0 .. 32 ]',
            [
                [  'for-loop', { iterator: 'x', range: '0..32' } ]
            ]
        ],
        [
            'Now lets open a second for loop inside - **Type** `for y in [ 0 .. 32 ]`',
            '    for x in [ 0 .. 32 ]',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 33; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..32' } ]);
                }

                return out;
            }
        ],
        [
            'Inside the for loop - ***type*** `color rotate red, 10 * x + 10 * y`',
            '        color rotate red, 10 * x + 10 * y',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 33; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..32' } ]);

                    for (y = 0; y < 33; y += 1) {
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

                for (x = 0; x < 33; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..32' } ]);

                    for (y = 0; y < 33; y += 1) {
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
            'Now for the shapes - **type** `square 20`',
            '        square 20',
            function () {
                var out = [],
                    x, y;

                for (x = 0; x < 33; x += 1) {
                    out.push([ 'for-loop', { iterator: 'y', range: '0..32' } ]);

                    for (y = 0; y < 33; y += 1) {
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