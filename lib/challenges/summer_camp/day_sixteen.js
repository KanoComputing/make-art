var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_sixteen',
    title       : 'Table Tennis',
    short_title : 'Table Tennis',
    icon_class  : 'challenge_tennis',
    description : 'Table Tennis is a game played with one or two people on each side of a table with the outline of a miniaturized tennis court drawn on it. Games are played to 11 or 21, and upon completion the victor’s paddle is thrown to the ground as they let out their battle cry.',
    img         : '/assets/summercamp/ch_pics/day_16.png',
    completion_text: 'Well done! You made a beautiful 3D ping pong table. But there isn’t anyone playing or watching the game! Use your creativity and code to draw some fellow campers enjoying the game.',
    difficulty  : 2,
    startAt     : 0,
    summerCamp  : true,
    rewards     : {'wallpaper': 1},
    steps       : generate.fromSequence([
        [
            'Begin by setting your stroke to zero with `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'It\'s a sunny day! Set the background color to blue - **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Set your color to green for the grass. **Type** `color green`.',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Move your cursor into place with `moveTo 0, 350`',
            'moveTo 0, 350',
            [
                [ 'move-to', { x: 0, y: 350 } ]
            ]
        ],
        [
            'Cover the bottom part of the canvas with grass. Draw a `rectangle` of width `500` and height `150`.',
            'rectangle 500, 150',
            [
                [ 'rectangle', { width: 500, height: 150 } ]
            ]
        ],
        [
            'Give your table a solid foundation with some wood legs. Set `color` to `brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Move the cursor into position for the first leg. **Type** `moveTo 20, 310`',
            'moveTo 20, 310',
            [
                [ 'move-to', { x: 20, y: 310 } ]
            ]
        ],
        [
            'Now draw the first leg. Type `rectangle 15, 150`.',
            'rectangle 15, 150',
            [
                [ 'rectangle', { width: 15, height: 150 } ]
            ]
        ],
        [
            'Now the second leg. **Type** `moveTo 465, 310`.',
            'moveTo 465, 310',
            [
                [ 'move-to', { x: 465, y: 310 } ]
            ]
        ],
        [
            'Now **draw** the second leg. Type `rectangle 15, 150`.',
            'rectangle 15, 150',
            [
                [ 'rectangle', { width: 15, height: 150 } ]
            ]
        ],
        [
            'And the third leg. **Type** `moveTo 40, 250`.',
            'moveTo 40, 250',
            [
                [ 'move-to', { x: 40, y: 250 } ]
            ]
        ],
        [
            'Now draw the third leg the same size as the others',
            'rectangle 15, 150',
            [
                [ 'rectangle', { width: 15, height: 150 } ]
            ]
        ],
        [
            'Finally, the fourth leg. **Type** `moveTo 445, 250`.',
            'moveTo 445, 250',
            [
                [ 'move-to', { x: 445, y: 250 } ]
            ]
        ],
        [
            'Now draw the fourth leg',
            'rectangle 15, 150',
            [
                [ 'rectangle', { width: 15, height: 150 } ]
            ]
        ],
        [
            'Now to put the table on! Set the drawing `color` to `darkgreen`.',
            'color darkgreen',
            [
                [ 'color', { color: palette.darkgreen } ]
            ]
        ],
        [
            'Move your table top into place. Type `moveTo 10, 300`.',
            'moveTo 10, 300',
            [
                [ 'move-to', { x: 10, y: 300 } ]
            ]
        ],
        [
            'Your table has perspective, to draw it use `polygon 30, -60, 450, -60, 480, 0`',
            'polygon 30, -60, 450, -60, 480, 0',
            [
                [ 'polygon', { points: [
                    { x: 0, y: 0 },
                    { x: 30, y: -60 },
                    { x: 450, y: -60 },
                    { x: 480, y: 0 }
                ] } ]
            ]
        ],
        [
            'For a cool 3D effect, lighten the drawing color with `color lighten darkgreen, 10`',
            'color lighten darkgreen, 10',
            [
                [ 'color', { color: 'rgba(111, 138, 81, 1)' } ]
            ]
        ],
        [
            '**Draw** the side of the table with `rectangle 480, 10`',
            'rectangle 480, 10',
            [
                [ 'rectangle', { width: 480, height: 10 } ]
            ]
        ],
        [
            'For the net, set the drawing `color` to `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            '`move` the cursor to **exactly** `248, 220`',
            'moveTo 248, 220',
            [
                [ 'move-to', { x: 248, y: 220 } ]
            ]
        ],
        [
            'Draw the net: a `rectangle` with a width of `4`, and height of `80`',
            'rectangle 4, 80',
            [
                [ 'rectangle', { width: 4, height: 80 } ]
            ]
        ],
        [
            'Give your scene a bouncing ball! Use random to decide what side of the table the ball should be on. **Type** `x = random 40, 460`.',
            'x = random 40, 460',
            [
                [ 'var', function (opts) {
                    return opts.name === 'x' && opts.value === 'random40,460';
                }]
            ]
        ],
        [
            'Now we’ll use random to decide how high the ball should be! **Type** `y = random 150, 250`.',
            'y = random 150, 250',
            [
                ['var', function (opts) {
                    return (opts.name === 'y' && opts.value === 'random150,250');
                }]
            ]
        ],
        [
            'Move the cursor to the x and y variables you just made. **Type** `moveTo x, y`.',
            'moveTo x, y',
            [
                [ 'move-to', function (opts) {
                    return (opts.x >= 40 && opts.x <= 460) && (opts.y > 150 && opts.y <= 250)
                }]
            ]
        ],
        [
            'Finally, draw your ball with a circle with radius 7. Type `circle 7`.',
            'circle 7',
            [
                [ 'ellipse', { rx: 7, isCircle: true } ]
            ]
        ]
    ])
};
