var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_six',
    title       : 'Campfire',
    short_title : 'Campfire',
<<<<<<< HEAD
    description : 'Time to get a fire going. In the wilderness, this very well might be your only source of light, and heat. Burning at over a thousand degrees fahrenheit, this will be sure to keep you warm, and could keep you fed too! Meats, vegetables, and marshmallows can all be cooked over the open flame with the help of sharpened sticks.  \nMost fires are built with wood logs, but yours is going to be built with code and a “loop.” As your fire grows upwards its colour changes into a deep shade of orange as the oxygen it is burning starts to cools down. Your code will produce hundreds of colours with just a few lines of code.',
=======
    icon_class  : 'challenge_fire',
    description : 'Fire is a chemical reaction that releases light and heat. A candle flame typically burns at around 1000 degrees Celsius (1800 Fahrenheit). The discovery of fire, or more precisely, the controlled use of fire was likely an invention of our ancestor Homo erectus, during the Early Stone Age. The earliest evidence for fire associated with humans comes from a site in Kenya, dated 1.6 million years ago. Fires can be stopped in 3 different ways: removing the fuel source by exhausting it or taking it away, removing the oxygen by smothering the fire or removing the heat by absorbing it with water.',
>>>>>>> origin/staging
    completion_text: 'Try adding a starry sky, more flames, a ring of rocks to make it safer or even marshmallows!',
    difficulty  : 2,
    img         : '/assets/summercamp/ch_pics/day_6.png',
    startAt     : 5,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'It\'s a dark night. Set the `background` color to `darkblue`',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Move the cursor to place the floor - **type** `moveTo 0, 300`',
            'moveTo 0, 300',
            [
                [ 'move-to', { x: 0, y: 300 } ]
            ]
        ],
        [
            'Set the `color` to `darkgreen`',
            'color darkgreen',
            [
                [ 'color', { color: palette.darkgreen } ]
            ]
        ],
        [
            'Draw the grass using a rectangle - **type** `rectangle 500, 200`',
            'rectangle 500, 200',
            [
                [ 'rectangle', { width: 500, height: 200 } ]
            ]
        ],
        [
            'Move the cursor to place the light casted by the fire - **type** `moveTo 250, 400`',
            'moveTo 250, 400',
            [
                [ 'move-to', { x: 250, y: 400 } ]
            ]
        ],
        [
            'Set the `color` to `green`',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Draw the light using an ellipse - **type** `ellipse 200, 30`',
            'ellipse 200, 30',
            [
                [ 'ellipse', { rx: 200, ry: 30 } ]
            ]
        ],
        [
            'We need some wood to feed the fire - **type** `moveTo 110, 390`',
            'moveTo 110, 390',
            [
                [ 'move-to', { x: 110, y: 390 } ]
            ]
        ],
        [
            'Set the stroke for the logs - **type** `stroke 25, brown`',
            'stroke 25, brown',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { width: 25 } ]
            ]
        ],
        [
            'Good, now draw the first log - **type** `line 270, 30`',
            'line 270, 30',
            [
                [ 'line', { dx: 270, dy: 30 } ]
            ]
        ],
        [
            'Move the cursor to place the second log - **type** `moveTo 420, 390`',
            'moveTo 420, 390',
            [
                [ 'move-to', { x: 420, y: 390 } ]
            ]
        ],
        [
            'Draw the second log - **type** `line -290, 30`',
            'line -290, 30',
            [
                [ 'line', { dx: -290, dy: 30 } ]
            ]
        ],
        [
            'Excellent! We are now ready to light the fire - **type** `moveTo 180, 400`',
            'moveTo 180, 400',
            [
                [ 'move-to', { x: 180, y: 400 } ]
            ]
        ],
        [
            'Our fire will be formed by 150 lines! - **type** `for i in [ 1 .. 150 ]`',
            'for i in [ 1 .. 150 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '1..150' } ]
            ]
        ],
        [
            'Set the thickness and color of each line - **type** `stroke 10, \'rgba(255, \' + (i + 50) + \', 0, 0.3)\'`',
            '    stroke 10, \'rgba(255, \' + (i + 50) + \', 0, 0.3)\'',
            function () {
                var out = [],
                    i = 1;
                for (i = 1; i <= 150; i += 1) {
                    out.push([ 'stroke-color', { color: 'rgba(255, ' + (i + 50) + ', 0, 0.3)' } ]);
                    out.push([ 'stroke-width', { width: 10 } ]);
                }
                return out;
            }
        ],
        [
            'Now draw the line - **type** `line 150 - i`',
            '    line 150 - i',
            function () {
                var out = [],
                    i = 1;
                for (i = 1; i <= 150; i += 1) {
                    out.push([ 'stroke-color', { color: 'rgba(255, ' + (i + 50) + ', 0, 0.3)' } ]);
                    out.push([ 'stroke-width', { width: 10 } ]);
                    out.push([ 'line', { dx: 150 - i, dy: 0 } ]);
                }
                return out;
            },
            { override: true }
        ],
        [
            'Move the cursor for next line - **type** `move 0.5, -2`',
            '    move 0.5, -2',
            function () {
                var out = [],
                    i = 1;
                for (i = 1; i <= 150; i += 1) {
                    out.push([ 'stroke-color', { color: 'rgba(255, ' + (i + 50) + ', 0, 0.3)' } ]);
                    out.push([ 'stroke-width', { width: 10 } ]);
                    out.push([ 'line', { dx: 150 - i, dy: 0 } ]);
                    out.push([ 'move-to', { dx: 0.5, dy: -2 } ]);
                }
                return out;
            },
            { override: true }
        ]
    ])
};
