var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'snowman',
    title       : 'Snowman',
    description : 'Draw a snowman using circles and loops',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the `background` to `darkblue`',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
            ]
        ],
        [
            'Move down, ***type*** `move 0, 200`',
            'move 0, 200',
            [
                [ 'move-to', { dx: 0, dy: 200 } ]
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
            'Set the `color` to `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Move back up, ***type*** `move 0, -200`',
            'move 0, -200',
            [
                [ 'move-to', { dx: 0, dy: -200 } ]
            ]
        ],
        [
            'Set the `stroke` to `lightgray`, with a size of `4`',
            'stroke lightgray, 4',
            [
                [ 'stroke-color', { color: palette.lightgray } ],
                [ 'stroke-width', { width: 4 } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `100`',
            'circle 100',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
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
            'Move left, ***type*** `move -60`',
            'move 0, -60',
            [
                [ 'move-to', { dx: -60, dy: 0 } ]
            ]
        ],
        [
            'Set the `color` to `black`',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
        [
            'Move right, ***type*** `move 120`',
            'move 0, 120',
            [
                [ 'move-to', { dx: 120, dy: 0 } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
        [
            'Move left and down, ***type*** `move -60, 30`',
            'move -60, 30',
            [
                [ 'move-to', { dx: -60, dy: 30 } ]
            ]
        ],
        [
            'Set the `color` to `orange`',
            'color orange',
            [
                [ 'color', { color: palette.orange } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `15`',
            'circle 15',
            [
                [ 'ellipse', { rx: 15, isCircle: true } ]
            ]
        ],
        [
            'Set the `color` to `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Now open a loop - ***type*** `for i in [ 0 .. 50 ]`',
            '\nfor i in [ 0 .. 50 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0..50' } ]
            ]
        ],
        [
            'Move around the canvas -  **type** `moveTo (random 1, 500), (random 1, 500)`',
            '    moveTo (random 1, 500), (random 1, 500)',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 51; i += 1) {
                    out.push([ 'move-to', function (options) {
                        return (
                            options.x > 0 && options.x <= 500 &&
                            options.y > 0 && options.y <= 500
                            );
                    } ]);
                }

                return out;
            }
        ],
        [
            'Draw the snow! Add `circle 5`',
            '    circle 5',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 51; i += 1) {
                    out.push([ 'move-to', function (options) {
                        return (
                            options.x > 0 && options.x <= 500 &&
                            options.y > 0 && options.y <= 500
                            );
                    } ]);
                    out.push([ 'ellipse', { rx: 5, isCircle: true }]);
                }

                return out;
            },
            { override: true }
        ]
    ])
};