var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_eight',
    title       : 'Pack your things',
    short_title : 'Backpack',
    icon_class  : 'challenge_backpack',
    description : 'BACKPACK',
    img         : '/assets/summercamp/ch_pics/day_8.png',
    completion_text: 'Well done! ',
    difficulty  : 1,
    startAt     : 0,
    rewards     : null,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Firstly, set the stroke to 0, to avoid drawing lines - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Let\'s move the cursor to place our backpack - in a new line **type** `moveTo 150, 200`',
            'moveTo 150, 200',
            [
                [ 'move-to', { x: 150, y: 200 } ]
            ]
        ],
        [
            'Let\'s choose `color` `brown` for our backpack. ',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw the main bag with a square - **type** `square 200`',
            'square 200',
            [
                [ 'rectangle', { width: 200, height: 200 } ]
            ]
        ],
        [
            'Now move the cursor to bottom part of our backpack - **type** `moveTo 250, 400`',
            'moveTo 250, 400',
            [
                [ 'move-to', { x: 250, y: 400 } ]
            ]
        ],
        [
            'Draw the bottom using an ellipse - **type** `ellipse 100, 30`',
            'ellipse 100, 30',
            [
                [ 'ellipse', { rx: 100, ry: 30 } ]
            ]
        ],
        [
            'We need to store the sleeping bag at the top - **type** `moveTo 250, 200`',
            'moveTo 250, 200',
            [
                [ 'move-to', { x: 250, y: 200 } ]
            ]
        ],
        [
            'Set the `color` of the sleeping bag to `lightbrown`',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'Ready to draw the sleeping bag? Use an ellipse - **type** `ellipse 115, 40`',
            'ellipse 115, 40',
            [
                [ 'ellipse', { rx: 115, ry: 40 } ]
            ]
        ],
        [
            'We need something to hold that sleeping bag to - **type** `moveTo 200, 160`.',
            'moveTo 200, 160',
            [
                [ 'move-to', { x: 200, y: 160 } ]
            ]
        ],
        [
            'The `orangered` seems like a nice `color` for the holders.',
            'color orangered',
            [
                [ 'color', { color: palette.orangered } ]
            ]
        ],
        [
            'Draw the left one first - **type** `rectangle 15, 90`.',
            'rectangle 15, 90',
            [
                [ 'rectangle', { width: 15, height: 90 } ]
            ]
        ],
        [
            'Position the cursor to the right to draw the next holder - **type** `moveTo 290, 160`.',
            'moveTo 290, 160',
            [
                [ 'move-to', { x: 290, y: 160 } ]
            ]
        ],
        [
            'Use a `rectangle` again for the right holder, dimensions are `15` by `90`.',
            'rectangle 15, 90',
            [
                [ 'rectangle', { width: 15, height: 90 } ]
            ]
        ],
        [
            'Excellent! We need more storage space. Move the cursor to the middle - **type** `moveTo 205, 320`.',
            'moveTo 205, 320',
            [
                [ 'move-to', { x: 205, y: 320 } ]
            ]
        ],
        [
            'Use a `rectangle` for the outside pocket, `90` by `60` will suffice.',
            'rectangle 90, 60',
            [
                [ 'rectangle', { width: 90, height: 60 } ]
            ]
        ],
        [
            'That pocket needs to be closed so bugs can`\t go in - **type** `moveTo 250, 320`.',
            'moveTo 250, 320',
            [
                [ 'move-to', { x: 250, y: 320 } ]
            ]
        ],
        [
            'Set the `color` to `lightbrown`',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'An `ellipse` of zise `48` by `7` will help here.',
            'ellipse 48, 7',
            [
                [ 'ellipse', { rx: 48, ry: 7 } ]
            ]
        ],
        [
            'Looking great! Put a botton in that pocket - **type** `moveTo 250, 330`.',
            'moveTo 250, 330',
            [
                [ 'move-to', { x: 250, y: 330 } ]
            ]
        ],
        [
            'Set the `color` to `brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw a `circle` botton of size `10`.',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
    ])
};
