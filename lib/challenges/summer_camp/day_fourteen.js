var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_fourteen',
    title       : 'Cheeky Bear',
    short_title : 'Bear',
    description : 'Deep in the forest there lives a heartless killing machine—a bear!',
    icon_class  : 'challenge_bear',
    img         : '/assets/summercamp/ch_pics/day_14.png',
    completion_text: 'Well done! Now give your bear its own name and style. Change his fur color on line 2, or the color of his eyes on line 10... why not add a nice background and some extra decorations? All those tool icons on the left can help you get started.',
    difficulty  : 2,
    startAt     : 0,
    rewards     : null,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'The bear lives in the forest. Set the background color to green - **type** `background green`',
            'background green',
            [
                [ 'background', { color: palette.green } ]
            ]
        ],
        [
            'The bear has brown fur, so let\'s get ready to draw his face by getting our brown paint ready - **type** `color brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
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
            'Draw the face with a circle - **type** `circle 100`',
            'circle 100',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
        [
            'Now let\'s move the cursor to draw his left ear - **type** `move -80, -80`',
            'move -80, -80',
            [
                [ 'move-to', { dx: -80, dy: -80 } ]
            ]
        ],
        [
            'Draw the ear with a **circle** of size **30**',
            'circle 30',
            [
                [ 'ellipse', { rx: 30, isCircle: true } ]
            ]
        ],
        [
            'Move the cursor to the right to draw his other ear - **type** `move 160`',
            'move 160',
            [
                [ 'move-to', { dx: 160 } ]
            ]
        ],
        [
            'Draw another ear (just like the last one)',
            'circle 30',
            [
                [ 'ellipse', { rx: 30, isCircle: true } ]
            ]
        ],
        [
            'Now head over to where the left eye will go - **type** `move -110, 50`',
            'move -110, 50',
            [
                [ 'move-to', { dx: -110, dy: 50 } ]
            ]
        ],
        [
            'The rest of the bear\'s facial features will be black, so lets get our black paint ready - **type** `color black`',
            'color black',
            [
                [ 'color', { color: palette.black } ]
            ]
        ],
        [
            'Draw the first eye - **type** `circle 5`',
            'circle 5',
            [
                [ 'ellipse', { rx: 5, isCircle: true } ]
            ]
        ],
        [
            'Next move over to where the other eye goes - **type** `move 60`',
            'move 60',
            [
                [ 'move-to', { dx: 60 } ]
            ]
        ],
        [
            'Fill in the other eye just like the last one',
            'circle 5',
            [
                [ 'ellipse', { rx: 5, isCircle: true } ]
            ]
        ],
        [
            'Move to the center of the face for the bear\'s most distinctive feature - **type** `move -30, 50`',
            'move -30, 50',
            [
                [ 'move-to', { dx: -30, dy: 50 } ]
            ]
        ],
        [
            'Draw his nose with a triangle using `polygon` - **type** `polygon 12, -16, -12, -16`',
            'polygon 12, -16, -12, -16',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 12, y: -16 },
                    { x: -12, y: -16 }
                ] } ]
            ]
        ],
        [
            'Let\'s get ready to draw the mouth by moving down a bit further - **type** `move 0, 20`',
            'move 0, 20',
            [
                [ 'move-to', { dx: 0, dy: 20 } ]
            ]
        ],
        [
            'Set the stroke (the outline of a shape) to size 3 and black - **type** `stroke 3, black`',
            'stroke 3, black',
            [
                [ 'stroke-color', { color: palette.black } ],
                [ 'stroke-width', { width: 3 } ]
            ]
        ],
        [
            'We don\'t want the mouth to be filled so set its color to null - **type** `color null`',
            'color null',
            [
                [ 'color', null  ]
            ]
        ],
        [
            'An arc is part of a cirlce, just like a smiling mouth - **type** `arc 15, 0.5, 2`',
            'arc 15, 0.5, 2',
            [
                [ 'arc', { radius: 15, start: 0.5, end: 2 }]
            ]
        ]
    ])
};