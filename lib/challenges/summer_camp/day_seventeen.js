var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_seventeen',
    title       : 'Fishing',
    short_title : 'Fishing',
    icon_class  : 'challenge_fishing',
    description : 'It\'s time to go fishing! Inside the camp\'s lake there are trout, catfish, and perch swimming around looking for a snack. Grab your fishing pole and some worms, and head over to the water for today\s adventure. ',
    img         : '/assets/summercamp/ch_pics/day_17.png',
    completion_text: 'Great job! Every time you press a key the image redraws, so try holding down the space bar and watch the waves ripple. Also try adding a fish or making the bobber disappear.',
    difficulty  : 2,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        [
            'It\'s a sunny day! Set the background color to blue - **type** `background blue`',
            'background lightblue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'We will start by drawing the waves. We want to draw without a fill - set the `color` to be `null`.',
            'color null',
            [
                [ 'color', null ]
            ]
        ],
        [
            'Our waves will be dark blue - **type** `stroke darkblue, 8`',
            'stroke darkblue, 8',
            [
                [ 'stroke-color', { color: palette.darkblue } ],
                [ 'stroke-width', { width: 8 } ]
            ]
        ],
        [
            'Move to the place on the left where we will start - **type** `moveTo 10, 250`',
            'moveTo 10, 250',
            [
                [ 'move-to', { x: 10, y: 250 } ]
            ]
        ],
        [
            'We are going to draw waves on the surface by creating 25 waves inside of a loop - **type** `for i in [1 .. 25]`',
            'for i in [1 .. 25]',
            [
                [ 'for-loop', { iterator: 'i', range: '1..25' } ]
            ]
        ],
        [
            'Create a wave out of an arc with a radius of 20 pixels - **type** `arc 20, 0.8, 0.2`',
            '    arc 20, 0.8, 0.2',
            function () {
                var out = [],
                i = 1;
                for (i = 1; i <= 25; i += 1) {
                    out.push([ 'arc', { radius: 20, start: 0.8, end: 0.2 } ]);
                }
                return out;
            }
        ],
        [
            'Move each wave a random amount to the left - **type** `move (random 24, 32)`',
            '    move (random 24, 32)',
            function () {
                var out = [],
                i = 1;
                for (i = 1; i <= 25; i += 1) {
                    out.push([ 'arc', { radius: 20, start: 0.8, end: 0.2 } ]);
                    out.push([ 'move-to', function (options) {
                        return options.dx >= 24 && options.dx <= 32
                    }])
                }
                return out;
            },
            { override: true }
        ],
        [
            'Press ENTER and then backspace to get rid of the indent. This exits the loop.\n\nNext move to the place where we will draw the rest of the water - **type** `moveTo 0, 270`.',
            'moveTo 0, 270',
            [
                [ 'move-to', { x: 0, y: 270 } ]
            ]
        ],
        [
            'Set the `color` of the water to be the same as the wave',
            'color darkblue',
            [
                [ 'color', { color: palette.darkblue } ]
            ]
        ],
        [
            'Draw a big `rectangle` that is `500` pixels high and `250` pixels wide for the water',
            'rectangle 500, 250',
            [
                [ 'rectangle', { width: 500, height: 250 } ]
            ]
        ],
        [
            'Let\'s get ready to add some little blue waves - **type** `stroke blue, 2`',
            'stroke blue, 2',
            [
                [ 'stroke-color', { color: palette.blue } ],
                [ 'stroke-width', { width: 2 } ]
            ]
        ],
        [
            'We are going to draw waves 100 times - **type** `for i in [1 .. 100]`',
            'for i in [1 .. 100]',
            [
                [ 'for-loop', { iterator: 'i', range: '1..100' } ]
            ]
        ],
        [
            'Move each wave to a random place on the surface of the water - **type** `moveTo (random 0, 500), (random 260, 500)`',
            '    moveTo (random 0, 500), (random 260, 500)',
            function () {
                var out = [],
                i = 1;
                for (i = 1; i <= 100; i += 1) {
                    out.push([ 'move-to', function (options) {
                        return options.x >= 0
                                && options.x <= 500
                                && options.y >= 260
                                && options.y <= 500
                    }]);
                }
                return out;
            }
        ],
        [
            'Now draw each ripple as a little arc - **type** `arc 10, 0.8, 0.2`',
            '    arc 10, 0.8, 0.2',
            function () {
                var out = [],
                i = 1;
                for (i = 1; i <= 100; i += 1) {
                    out.push([ 'move-to', function (options) {
                        return options.x >= 0
                                && options.x <= 500
                                && options.y >= 260
                                && options.y <= 500
                    }]);
                    out.push([ 'arc', { radius: 10, start: 0.8, end: 0.2 } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Brilliant! When you press the spacebar, a new set of random numbers is selected and the ripples move!\n\nTo catch some fish we need a brown fishing pole - Exit the loop and **type** `stroke brown, 10`.',
            'stroke brown, 10',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { width: 10 } ]
            ]
        ],
        [
            'Now move to the place where we will draw the end of the pole - **type** `moveTo 300, 100`',
            'moveTo 300, 100',
            [
                [ 'move-to', { x: 300, y: 100 } ]
            ]
        ],
        [
            'Draw a `line` that is `150` pixels wide and `400` pixels tall',
            'line 150, 400',
            [
                [ 'line', { dx: 150, dy: 400 } ]
            ]
        ],
        [
            'Next we need some fishing line - **type** `stroke lightgray, 1`',
            'stroke lightgray, 1',
            [
                [ 'stroke-color', { color: palette.lightgray } ],
                [ 'stroke-width', { width: 1 } ]
            ]
        ],
        [
            'Draw a line that goes to the left and down - **type** `line -100, 200`',
            'line -100, 200',
            [
                [ 'line', { dx: -100, dy: 200 } ]
            ]
        ],
        [
            'To see if a fish is biting we are going to draw a cork. Move to the end of the fishing line - **type** `move -100, (random 197, 202)`',
            'move -100, (random 197, 202)',
            [
                [ 'move-to', function(options){
                    return options.dx == -100
                            && options.dy >= 197
                            && options.dy <= 202
                }]
            ]
        ],
        [
            'The cork doesn\'t have an outline - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Set the cork\'s `color` to `red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Now draw the cork floating in the water - `arc 8, 0, 1`',
            'arc 8, 0, 1',
            [
                [ 'arc', { radius: 8, start: 0, end: 1 } ]
            ]
        ]
    ])
};
