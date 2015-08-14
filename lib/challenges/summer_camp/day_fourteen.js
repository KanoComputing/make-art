var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_fourteen',
    title       : 'Relax watching a movie',
    short_title : 'Cinema',
    icon_class  : 'challenge_cinema',
    description : 'After playing a short movie presentation by the Skladanowsky brothers in 1895 which consisted of numerous very short 6-second films accompanied by a specially composed piece of music, the Berlin Wintergarten theatre in Mitte, Berlin, became known as the first ever movie theatre. Unfortunately the theatre was destroyed by bombs in 1944, during the Second World War.',
    img         : '/assets/summercamp/ch_pics/day_14.png',
    completion_text: 'What good is a cinema without a movie playing? Go ahead and try drawing a scene from your favourite movie up on the big screen, and maybe a few friends to watch the film with you! Don\'t forget the popcorn!',
    difficulty  : 2,
    startAt     : 0,
    rewards     : null,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'It\'s dark in the cinema. Set the `background` color to `black`',
            'background black',
            [
                [ 'background', { color: palette.black } ]
            ]
        ],
        [
            'Set the `stroke` to `0` in a new line',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'First, move the cursor to place the floor - **type** `moveTo 0, 300`',
            'moveTo 0, 300',
            [
                [ 'move-to', { x: 0, y: 300 } ]
            ]
        ],
        [
            'Set the floor `color` to `gray`',
            'color gray',
            [
                [ 'color', { color: palette.gray } ]
            ]
        ],
        [
            'Draw the floor with a rectangle - **type** `rectangle 500, 200`',
            'rectangle 500, 200',
            [
                [ 'rectangle', { width: 500, height: 200 } ]
            ]
        ],
        [
            'Now, move the cursor to place the screen - **type** `moveTo 50, 20`',
            'moveTo 50, 20',
            [
                [ 'move-to', { x: 50, y: 20 } ]
            ]
        ],
        [
            'Set the screen `color` to `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'The screen is a perfect `rectangle` of size `400` by `250`',
            'rectangle 400, 250',
            [
                [ 'rectangle', { width: 400, height: 250 } ]
            ]
        ],
        [
            'Amazing! This theatre needs a curtain - **type** `moveTo 0`',
            'moveTo 0',
            [
                [ 'move-to', { x: 0, y: 0 } ]
            ]
        ],
        [
            'Set the curtain `color` to `red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw a vertical curtain as a `rectangle` of size `30` by `330`',
            'rectangle 30, 330',
            [
                [ 'rectangle', { width: 30, height: 330 } ]
            ]
        ],
        [
            'Now draw an horizontal curtain size `500` by `10` in the same way',
            'rectangle 500, 10',
            [
                [ 'rectangle', { width: 500, height: 10 } ]
            ]
        ],
        [
            'Looking great! Place the curtain on the right - **type** `move 470`',
            'move 470',
            [
                [ 'move-to', { dx: 470, dy: 0 } ]
            ]
        ],
        [
            'Draw a vertical curtain, same as the one the left',
            'rectangle 30, 330',
            [
                [ 'rectangle', { width: 30, height: 330 } ]
            ]
        ],
        [
            'This theatre needs some seats for our audience - **type** `moveTo 0, 360`',
            'moveTo 0, 360',
            [
                [ 'move-to', { x: 0, y: 360 } ]
            ]
        ],
        [
            'Set the outline of the seats with a `stroke` of `10` and `orangered` color.',
            'stroke 10, orangered',
            [
                [ 'stroke-color', { color: palette.orangered } ],
                [ 'stroke-width', { 'width': 10 } ]
            ]
        ],        
        [
            'Let\'s draw 3 rows and 6 columns of seats with a loop - **type** `for x in [ 1 .. 3 ]`',
            'for x in [ 1 .. 3 ]',
            [
                [ 'for-loop', { iterator: 'x', range: '1..3' } ]
            ]
        ],
        [
            'Set the `color` of the seats to `red`',
            '    line 250',
            function () {
                var x = 0,
                    out = [];

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                }
                return out;
            }
        ],
        [
            'Now draw a `rectangle` for the seats, size `500` by `40`',
            '    rectangle 500, 40',
            function () {
                var x = 0,
                    out = [];

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Move the cursor down to place the back of the seats - **type** `move 0, 50`',
            '    move 0, 50',
            function () {
                var x = 0,
                    out = [];

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 50 } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Inside the loop, open a second loop for the back of the seats - **type** `for y in [ 1 .. 6 ]`',
            '    for y in [ 1 .. 6 ]',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 50 } ]);
                    out.push([ 'for-loop', { iterator: 'y', range: '1..6' } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Set the `color` of the backseat to `darkred`',
            '        color darkred',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 50 } ]);
                    out.push([ 'for-loop', { iterator: 'y', range: '1..6' } ]);
                    for (y = 0; y < 6; y += 1) {
                        out.push([ 'color', { color: palette.darkred } ]);
                    }
                }
                return out;
            },
            { override: true }
        ],
        [
            'Brilliant! Almost there. Now draw the back of the seat with an arc - **type** `arc 60, 0, 1`',
            '        arc 60, 0, 1',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 50 } ]);
                    out.push([ 'for-loop', { iterator: 'y', range: '1..6' } ]);
                    for (y = 0; y < 6; y += 1) {
                        out.push([ 'color', { color: palette.darkred } ]);
                        out.push([ 'arc', { radius: 60, start: 0, end: 1 }]);
                    }
                }
                return out;
            },
            { override: true }
        ],
        [
            'Now separate the seats `130` pixels to the right',
            '        move 130',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 50 } ]);
                    out.push([ 'for-loop', { iterator: 'y', range: '1..6' } ]);
                    for (y = 0; y < 6; y += 1) {
                        out.push([ 'color', { color: palette.darkred } ]);
                        out.push([ 'arc', { radius: 60, start: 0, end: 1 }]);
                        out.push([ 'move-to', { dx: 130, dy: 0 } ]);
                    }
                }
                return out;
            },
            { override: true }
        ],
        [
            'Last, make sure new rows are positioned correctly - Press **Enter**, then **Backspace** and **type** `move -800` inside the **first** loop',
            '    move -800',
            function () {
                var out = [],
                    x;

                for (x = 0; x < 3; x += 1) {
                    out.push([ 'color', { color: palette.red } ]);
                    out.push([ 'rectangle', { width: 500, height: 40 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 50 } ]);
                    out.push([ 'for-loop', { iterator: 'y', range: '1..6' } ]);
                    for (y = 0; y < 6; y += 1) {
                        out.push([ 'color', { color: palette.darkred } ]);
                        out.push([ 'arc', { radius: 60, start: 0, end: 1 }]);
                        out.push([ 'move-to', { dx: 130, dy: 0 } ]);
                    }
                    out.push([ 'move-to', { dx: -800, dy: 0 } ]);
                }
                return out;
            },
            { override: true }
        ],
    ])
};
