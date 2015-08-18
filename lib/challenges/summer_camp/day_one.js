var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_one',
    title       : 'Your Summer Camp sign',
    short_title : 'Camp Sign',
    description : 'Welcome to your first day! Before you set out from the lodge, your campsite sign needs a design. Be creative! Use a crazy color scheme, or show what you want to do at camp.  \nIn the Pacific Northwest of the United States, indigenous peoples carved Totem Poles to tell the stories of their families and cultures. These beautiful sculptures are carved into trees and often feature characters and events from legends. You can search the internet for images of Totem Poles for inspiration.',
    icon_class  : 'challenge_campsign',
    img         : '/assets/summercamp/ch_pics/day_1.png',
    completion_text: 'Well done! Now give your camp its own name and style. Change your camp name on line 18, or the color of the sign on line 6... why not add a nice background and some extra decorations? All those tool icons on the left can help you get started.',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        [ 
            'It\'s a sunny day! Set the asd color to blue - **type** `a = 3`',
            'a = 3',
            [
                ['var', function (opts) {
                    return (opts.name === 'a' && opts.value ==='3');
                }]
            ]
            
        ],
        [
            'Press ENTER to add the next instruction. Set the stroke to 0, to avoid drawing lines - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', function(options){ 
                    return !isNaN(options.width); 
                }]
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
            'Press ENTER and let\'s move the cursor to place our sign - **type** `moveTo 100, 150`',
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
            'Let\'s draw a shadow. Set the color to brown first - **type** `color brown`',
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
            'Choose the font to use - **type** `font \'Bariol\', 70`. You can also try some other fonts like `Georgia`, `Comic Sans MS`, `cursive`, and `Courier`.',
            'font \'Bariol\', 70',
            [
                [ 'font-family', function(options){
                    return (options.font === "Bariol") ||
                           (options.font === "Georgia") ||
                           (options.font === "Comic Sans MS") ||
                           (options.font === "cursive") ||
                           (options.font === "Courier");
                }],
                [ 'text-size', { size: '70' } ],
            ]
        ],
        [
            'Now write some silly text - **type** `text \'My Camp\'`',
            'text \'My Camp\'',
            [
                [ 'text', function(options){
                    return (typeof(options.value)=="string" &&
                            options.value.length > 0);
                }]
            ]
        ]      
    ])
};
