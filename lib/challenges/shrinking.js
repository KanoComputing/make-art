var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'shrinking',
    title       : 'Shrinking Circles',
    description : 'Ever shrinking circles with a for loop!',
    code        : '',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the stroke - **type** `stroke gray, 3`',
            'stroke gray, 3',
            [
                [ 'stroke-color', { color: palette.gray } ],
                [ 'stroke-width', { width: 3 } ]
            ]
        ],
        [
            'Set the color to see through - In a new line, **type** `color null`',
            'color null',
            [
                [ 'color', { color: null } ]
            ]
        ],
        [
            'Now let\'s open a loop - ***type*** `for i in [ 0 .. 32 ]`',
            'for i in [ 0 .. 32 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0..32' } ]
            ]
        ],
        // [
        //     'Awesome, let\'s draw some circles - inside the for loop ***type*** `circle 10*i`',
        //     'circle 10*i',
        //     function () {
        //         var i = 0,
        //             out = [];

        //         for (i = 0; i < 32; i += 1) {
        //             out.push([ 'ellipse', { isCircle: true } ]);
        //         }

        //         return out;
        //     }
        // ],
        // [
        //     'Awesome, let\'s draw some circles - inside the for loop ***type*** `circle 10*i`',
        //     'circle 10*i',
        //     [
        //         [ 'for-loop', { rx: 100, isCircle: true } ]
        //     ]
        // ],
    ])
};