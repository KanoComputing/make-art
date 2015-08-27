var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_thirteen',
    title       : 'Play a nice sweet song',
    short_title : 'Guitar',
    icon_class  : 'challenge_guitar',
    description : 'Did you know the oldest surviving guitar-like instrument is actually around 3,500 years old? It is a 3-string instrument with a plectrum suspended from the neck, it was owned by an Egyptian singer called Har-Mose and was buried alongside him - You can still see the instrument on display at the Archaeological Museum in Cairo, Egypt.',
    img         : '/assets/summercamp/ch_pics/day_13.png',
    completion_text: 'What good is a guitar if we don\'t have a campfire to sing songs around? Try drawing a nice big campfire with some marshmallows for toasting! Maybe a big moon on the horizon too? Be wild, be creative!',
    difficulty  : 2,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        [
            'It\'s a very nice night! Set the background color to darkblue - **type** `background darkblue`',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
            ]
        ],
        [
            'Set the `stroke` to `0` in a new line.',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Set your guitar `color` to `lightbrown`.',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'Move the cursor to place the guitar - **type** `moveTo 120, 250`',
            'moveTo 120, 250',
            [
                [ 'move-to', { x: 120, y: 250 } ]
            ]
        ],
        [
            'Draw the first part of the body with an ellipse - **type** `ellipse 60, 65`',
            'ellipse 60, 65',
            [
                [ 'ellipse', { rx: 60, ry: 65 } ]
            ]
        ],
        [
            'Now for the second part of the body, `move` the cursor `70` pixels to the right.',
            'move 70',
            [
                [ 'move-to', { dx: 70, dy: 0 } ]
            ]
        ],
        [
             'Draw a `circle` of size `55` for the second part of the guitar.',
             'circle 55',
            [
                 [ 'ellipse', { rx: 55, isCircle: true } ]
            ]
        ],
        [
            'Every guitar needs a neck, move the cursor to place it - **type** `move 20, -10`',
            'move 20, -10',
            [
                [ 'move-to', { dx: 20, dy: -10 } ]
            ]
        ], 
        [
            'Set the neck `color` to `brown`.',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw the neck of the guitar with a rectangle - **type** `rectangle 150, 20`',
            'rectangle 150, 20',
            [
                [ 'rectangle', { width: 150, height: 20 } ]
            ]
        ],
        [
            'Now place the headstock - **type** `move 150, -5`',
            'move 150, -5',
            [
                [ 'move-to', { dx: 150, dy: -5 } ]
            ]
        ], 
        [
            'Draw the headstock with a `rectangle` of size `40` by `30`.',
            'rectangle 40, 30',
            [
                [ 'rectangle', { width: 40, height: 30 } ]
            ]
        ],
        [
            'Time to place the soundhole in the body - **type** `move -170, 15`',
            'move -170, 15',
            [
                [ 'move-to', { dx: -170, dy: 15 } ]
            ]
        ],
        [
            'Set the outline of the soundhole with a `stroke` of `10` and `brown` color.',
            'stroke brown, 10',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { 'width': 10 } ]
            ]
        ],
        [
            'Set the soundhole `color` to `black`.',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
             'Draw the hole with a `circle` of size `20`.',
             'circle 20',
            [
                 [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ],
        [
            'The bridge is the piece that fixes the strings to the body. Let\'s place it  - **type** `move -50, -15`',
            'move -50, -15',
            [
                [ 'move-to', { dx: -50, dy: -15 } ]
            ]
        ],
        [
            'Set the outline of the bridge with a `stroke` of `10` and `red` color.',
            'stroke red, 10',
            [
                [ 'stroke-color', { color: palette.red } ],
                [ 'stroke-width', { 'width': 10 } ]
            ]
        ],
        [
            'Draw the bridge with a `rectangle` of size `2` by `35`.',
            'rectangle 2, 35',
            [
                [ 'rectangle', { width: 2, height: 35 } ]
            ]
        ],
        [
            'That\'s a good looking guitar. Time for the strings - **type** `move 0, 9`',
            'move 0, 9',
            [
                [ 'move-to', { dx: 0, dy: 9 } ]
            ]
        ],
        [
            'Set the properties of the strings with a `stroke` of `1` and `white` color.',
            'stroke white, 1',
            [
                [ 'stroke-color', { color: palette.white } ],
                [ 'stroke-width', { 'width': 1 } ]
            ]
        ],
        [
            'Let\'s draw the 4 strings with a loop - **type** `for i in [ 1 .. 4 ]`',
            'for i in [ 1 .. 4 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '1..4' } ]
            ]
        ],
        [
            'Draw a string using a line - **type** `line 250`',
            '    line 250',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 4; i += 1) {
                    out.push([ 'line', { dx: 250, dy: 0 } ]);
                }
                return out;
            }
        ],
        [
            'And move the cursor slightly down to place the next ones - **type** `move 0, 4`',
            '    move 0, 4',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 4; i += 1) {
                    out.push([ 'line', { dx: 250, dy: 0 } ]);
                    out.push([ 'move-to', { dx: 0, dy: 4 } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Press **Enter** and **Backspace** to set the `color` to `white` outside the loop',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'You are ready to play music! Start a new loop - **type** `for i in [ 1 .. 10 ]`',
            'for i in [ 1 .. 10 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '1..10' } ]
            ]
        ],
        [
            'Select a random location - **type** `moveTo (random 200, 400), (random 100, 400)`',
            '    moveTo (random 200, 400), (random 100, 400)',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 10; i += 1) {
                    out.push([ 'move-to', function (options) {
                                return (
                                    options.x >= 200 && options.x <= 400 &&
                                    options.y >= 100 && options.y <= 400
                                    );
                                } 
                            ]);
                }
                return out;
            }
        ],
        [
            'Come on, play some notes! - **copy and paste** `text \'♪\'`',
            '    text \'♪\'',
            function () {
                var i = 0,
                    out = [];

                for (i = 0; i < 10; i += 1) {
                    out.push([ 'move-to', function (options) {
                                return (
                                    options.x >= 200 && options.x <= 400 &&
                                    options.y >= 100 && options.y <= 400
                                    );
                                } 
                            ]);
                    out.push([ 'text', { value: '♪' } ]);
                }
                return out;
            },
            { override: true }
        ],
    ])
};
