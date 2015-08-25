var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_one',
    title       : 'Your Summer Camp sign',
    short_title : 'Camp Sign',
    description : 'Welcome to your first day! Before you set out from the lodge, your campsite sign needs a design. Be creative! Use a crazy color scheme, or show what you want to do at camp.  \nIn the Pacific Northwest of the United States, indigenous peoples carved Totem Poles to tell the stories of their families and cultures. These beautiful sculptures are carved into trees and often feature characters and events from legends. You can search the internet for images of Totem Poles for inspiration.',
    icon_class  : 'challenge_campsign',
    img         : '/assets/summercamp/ch_pics/day_1.png',
    completion_text: 'Well done! Now give your camp its own name and style. Change your camp name on line 18, or the color of the sign on line 3... why not add a nice background and some extra decorations? All those tool icons on the left can help you get started.',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        [
            'It\'s a sunny day! Set the background color to blue - **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Let\'s move the cursor over to the place on the screen where we want to start drawing our sign.\n\nPress ENTER to add the next instruction, and  - **type** `moveTo 100, 150`.',
            'moveTo 100, 150',
            [
                [ 'move-to', { x: 100, y: 150 } ]
            ]
        ],
        [
            'In Make Art, we draw shapes using digital pens. Before we draw our sign we need to choose the pen we want to use to color it in. \n\nLet\'s select a brown pen - **type** `color lightbrown`',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'When we draw a shape we can control how thick the line is that the pen leaves behind on the outside of the shape. This line is called the **stroke**.\n\nPress ENTER and then set the stroke to 0, to avoid drawing lines - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', function(options){ 
                    return !isNaN(options.width); 
                }]
            ]
        ],
        [
            'Now that we have our pen all set up, we can get started on the sign!\n\nDraw the main billboard with a rectangle - **type** `rectangle 300, 200`.',
            'rectangle 300, 200',
            [
                [ 'rectangle', { width: 300, height: 200 } ]
            ]
        ],
        [
            'Let\'s draw a shadow. Set the color to brown first - **type** `color brown`.',
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
            'That sign looks too clean. We need to draw some imperfections.\n\nMove the cursor to place one on the left side of the sign- **type** `moveTo 100, 220`.',
            'moveTo 100, 220',
            [
                [ 'move-to', { x: 100, y: 220 } ]
            ]
        ],      
        [
            'Our imperfection will be a triangle. First we need to set the `color` to `blue` to match the background.',
            'color blue',
            [
                [ 'color', { color: palette.blue } ]
            ]
        ],
        [
            'Set the stroke to be size 5 and brown (to match the sign). You can do both these things in one command - **type** `stroke 5, brown`.',
            'stroke 5, brown',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { width: 5 } ]
            ]
        ],
        
        [
            'Now we will use the `polygon` command to draw a triangular imperfection. To create it, we need to list out the positions of the two other corners - **type** `polygon 16, 10, 0, 11`.',
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
            'The sign needs a post. Move the cursor to where we will draw it - **type** `moveTo 230, 350`.',
            'moveTo 230, 350',
            [
                [ 'move-to', { x: 230, y: 350 } ]
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
            'Set the stroke to 0, again - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Now that we have the colors sorted, draw the post with a rectangle - **type** `rectangle 40, 150`',
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
            'Next we need to choose our font. There are lots to choose from, like `Bariol`, `Georgia`, `Comic Sans MS`, `cursive`, and `Courier`.\n\nPick your favorite and type it in (inside of quote marks) like this - `font \'Bariol\', 70`.',
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
