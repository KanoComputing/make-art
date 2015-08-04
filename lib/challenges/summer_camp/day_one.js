var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_one',
    title       : 'Camp sign',
    description : 'Design your own camp sign',
    completion_text: 'Try adding more cool stuff BALBALBALBLALBALBLA',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'It\'s a sunny day! Set the background color to blue - **type** `background blue`',
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
            'Set the color to lightbrown - in a new line **type** `color lightbrown`',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'Let\'s move the cursor to place our sign - **type** `moveTo 100, 150`',
            'moveTo 100, 150',
            [
                [ 'move-to', { x: 100, y: 150 } ]
            ]
        ],
        [
            'Draw the main billboard with a rectangle - **type** `rectangle 300, 200`',
            'rectangle 300, 200',
            [
                [ 'rectangle', { width: 300, height: 200 } ]
            ]
        ],
        [
            'Let\s draw a shadow. Set the color to brown first - **type** `color brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw a thin shadow with a rectangle - **type** `rectangle 300, 5`',
            'rectangle 300, 5',
            [
                [ 'rectangle', { width: 300, height: 5 } ]
            ]
        ],        
        [
            'That sign looks too clean, draw some imperfections. First set back the `color` to `blue`',
            'color blue',
            [
                [ 'color', { color: palette.blue } ]
            ]
        ],
        [
            'Set the stroke (the outline of a shape) to size 5 and brown - **type** `stroke 5, brown`',
            'stroke 5, brown',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { width: 5 } ]
            ]
        ],
        [
            'Move the cursor to place the first imperfection on the left - **type** `moveTo 100, 220`',
            'moveTo 100, 220',
            [
                [ 'move-to', { x: 100, y: 220 } ]
            ]
        ],
        [
            'Draw a polygon for the shape - **type** `polygon 16, 10, 0, 11`',
            'polygon 16, 10, 0, 11',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 16, y: 10 },
                    { x: 0, y: 11 }
                ] } ]
            ]
        ],
        [
            'The sign needs a post. Set the stroke to 0, again - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Set the color of the post to brown - **type** `color brown` ',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Move the cursor to place the post - **type** `moveTo 230, 350`',
            'moveTo 230, 350',
            [
                [ 'move-to', { x: 230, y: 350 } ]
            ]
        ],
        [
            'Draw the post with a rectangle - **type** `rectangle 40, 150`',
            'rectangle 40, 150',
            [
                [ 'rectangle', { width: 40, height: 150 } ]
            ]
        ],
        [
            'We need some text in that sign. Move the cursor to place the text - **type** `moveTo 250, 270`',
            'moveTo 250, 270',
            [
                [ 'move-to', { x: 250, y: 270 } ]
            ]
        ],
        [
            'Choose the font to use - **type** `font \'Bariol\', 70`',
            'font \'Bariol\', 70',
            [
                [ 'font', { type: 'Bariol', size: 70 } ]
            ]
        ],
        [
            'Now write some silly text - **type** `text \'My Camp\'`',
            'text \'My camp\'',
            [
                [ 'text', { message: 'My camp' } ]
            ]
        ],      
    ])
};
