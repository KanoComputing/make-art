var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_twentyone',
    title       : 'Fireworks',
    short_title : 'Fireworks',
    icon_class  : 'challenge_fireworks',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_21.png',
    completion_text: 'Well done! You made a function that can draw fireworks! Can you improve upon it? Draw them all over the screen, add in other creations and share it!',
    difficulty  : 3,
    startAt     : 0,
    summerCamp  : true,
    rewards     : ['wallpaper', 'outfit'],
    steps       : generate.fromSequence([
        [
            'The sun is down and the moon is new, let’s make the sky dark with `background black`',
            'background black',
            [
                [ 'background', { color: palette.black } ]
            ]
        ],
        [
            'We want to fill the sky with fireworks. They will be all be made similarly, but their color and position should be chosen by you. To do this we will define a firework function that takes x, y coordinates and a color. **Type** `firework = (startx, starty, burstColor) ->`.',
            'firework = (startx, starty, burstColor) ->',
            [
                [ 'function', { color: palette.black } ]
            ]
        ],
        [
            'First let’s move the cursor into place with `moveTo x, y`',
            'moveTo x, y',
            [
                ['move-to', function (opts) {
                     return (typeof opts.x === 'number' && typeof opts.y === 'number')
                }]
            ]
        ],
        [
            'Next lets set the `stroke` to `1, burstColor`',
            'moveTo x, y',
            [
                ['move-to', function (opts) {
                     return (typeof opts.x === 'number' && typeof opts.y === 'number')
                }]
            ]
        ],
        [
            'We want to draw 60 lines radiating outward, so let’s use a for loop `for i in [ 0 .. 60 ]`',
            'for i in [ 0 .. 60 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0..60' } ]
            ]
        ],
        [
            'All of the lines in our fireworks should have different lengths! So for each line radiating out, let’s set its length with `randomLength = random 1, 150`.',
            'randomLength = random 1, 150',
            [
                [ 'var', function (opts) {
                    return (opts.name === 'randomLength' && opts.value === 'random1,150' );
                }]
            ]
        ],
        [
            'For each loop, we are drawing a new line radiating out. So for every time we loop, the angle of the line should change. This uses some advanced math, but don’t fear. Just **type** `angle = (360 / 60 * i) * (Math.PI / 180)`.',
            'angle = (360 / 60 * i) * (Math.PI / 180)',
            [
                [ 'var', function (opts) {
                    return (opts.name === 'angle' && opts.value === '(360/60*i)*(Math.PI/180)' );
                }]
            ]
        ],
        [
            'Using this new angle and the random length let’s calculate where the x coordinate for the end of the radiating line should be. **Type** `dx = x + Math.sin(angle) * randomLength`.',
            'dx = x + Math.sin(angle) * randomLength',
            [
                [ 'var', function (opts) {
                    return (opts.name === 'dx' && opts.value === 'x + Math.sin(angle) * randomLength' );
                }]
            ]
        ],
        [
            'Now let’s calculate the y coordinate for the end of the radiating line. **Type** `dy = y + Math.cos(angle) * randomLength`.',
            'dy = y + Math.cos(angle) * randomLength',
            [
                [ 'var', function (opts) {
                    return (opts.name === 'dy' && opts.value === 'y + Math.cos(angle) * randomLength' );
                }]
            ]
        ],
        [
            'Finally, with all the coordinates set we are ready to draw the line. **Type** `lineTo dx, dy` ',
            'lineTo dx, dy',
            [
                [ 'line', { x: 'dx', dy: 'dy' } ]
            ]
        ],
        [
            'Now let’s draw a firework! Press backspace twice to get out of both indentations, and type `firework(100, 100, red)`.',
            'firework(100, 100, red)',
            [
                [ 'firework', { x: 'dx', dy: 'dy' } ]
            ]
        ],
        [
            'The first two numbers you pass are the x and y coordinates. What happens when you change the values? `firework(200, 200, yellow)`.',
            'firework(200, 200, yellow)',
            [
                [ 'firework', { x: 'dx', dy: 'dy' } ]
            ]
        ],
        [
            'The third value you pass it is the colour. Let’s try a green firework with `firework(300, 400, green)`.',
            'firework(300, 400, green)',
            [
                [ 'firework', { x: 'dx', dy: 'dy' } ]
            ]
        ],
        [
            'To get a cool effect you can layer them on top of each other by entering the same coordinates and trying a different color! **Type** `firework(300, 400, blue)`.',
            'firework(300, 400, green)',
            [
                [ 'firework', { x: 'dx', dy: 'dy' } ]
            ]
        ],
        [
            'Let’s draw one last one to fill the sky `firework(400, 100, hotpink)`.',
            'firework(400, 100, hotpink)',
            [
                [ 'firework', { x: 'dx', dy: 'dy' } ]
            ]
        ]
    ])
};
