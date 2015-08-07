var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_two',
    title       : 'Draw your Campsite',
    short_title : 'Campsite',
    description : 'The most important thing to look for when searching for an optimal campsite is flat ground. Keep your campsite close, if possible, to a water source but not too close. And remember! Once you leave, dispose of your waste properly and do not leave any trace of your visit. As a general rule of thumb, don’t leave your “footprint” on the earth.',
    completion_text: 'The camp site is looking great! Try adding more trees, flowers, rocks... perhaps a fence as well?',
    img         : '/assets/summercamp/ch_pics/day_2.png',
    difficulty  : 1,
    startAt     : 1,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Today is a beautiful day - **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
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
            'Move the cursor where the sun will be - **type** `moveTo 400, 50`',
            'moveTo 400, 50',
            [
                [ 'move-to', { x: 400, y: 50 } ]
            ]
        ],
        [
            'Set the `color` of the sun `yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Draw the sun with a circle - **type** `circle 40`',
            'circle 40',
            [
                [ 'ellipse', { rx: 40, isCircle: true } ]
            ]
        ],
        [
            'There is one cloud in the horizon. - **type** `moveTo 440, 80`',
            'moveTo 440, 80',
            [
                [ 'move-to', { x: 440, y: 80 } ]
            ]
        ],
        [
            'Set the `color` of the cloud `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw the cloud with an ellipse - **type** `ellipse 60, 20`',
            'ellipse 60, 20',
            [
                [ 'ellipse', { rx: 60, ry: 20 } ]
            ]
        ],
        [
            'The lake has a beautiful `color` `aquamarine` this morning',
            'color aquamarine',
            [
                [ 'color', { color: palette.aquamarine } ]
            ]
        ],
        [
            'Move the cursor where the lake is - **type** `moveTo 0, 190`',
            'moveTo 0, 190',
            [
                [ 'move-to', { x: 0, y: 190 } ]
            ]
        ],
        [
            'Draw the lake using a simple rectangle - **type** `rectangle 500, 310`',
            'rectangle 500, 310',
            [
                [ 'rectangle', { width: 500, height: 310 } ]
            ]
        ],
        [
            'Set the `color` to `green` for the grass',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Move the cursor before drawing the grass - **type** `moveTo 250, 700`',
            'moveTo 250, 700',
            [
                [ 'move-to', { x: 250, y: 700 } ]
            ]
        ],
        [
            'Draw the camp site with a circle - **type** `circle 500`',
            'circle 500',
            [
                [ 'ellipse', { rx: 500, isCircle: true } ]
            ]
        ],
        [
            'Looking a bit empty, let\'s draw a tree - **type** `moveTo 120, 300`',
            'moveTo 120, 300',
            [
                [ 'move-to', { x: 120, y: 300 } ]
            ]
        ],
        [
            'Set the `color` of the trunk to `brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw the trunk of the tree using a rectangle - **type** `rectangle 15, 100`',
            'rectangle 15, 100',
            [
                [ 'rectangle', { width: 15, height: 100 } ]
            ]
        ],
        [
            'Now place the foliage of the tree - **type** `move 8, -120`',
            'move 8, -120',
            [
                [ 'move-to', { dx: 8, dy: -120 } ]
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
            'Draw the foliage with a triangle using `polygon` - **type** `polygon -40, 160, 40, 160`',
            'polygon -40, 160, 40, 160',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: -40, y: 160 },
                    { x: 40, y: 160 }
                ] } ]
            ]
        ],
    ])
};
