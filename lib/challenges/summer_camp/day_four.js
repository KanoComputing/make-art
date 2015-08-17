var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_four',
    title       : 'Create your Flag',
    short_title : 'Flag',
    description : 'Time to show your true colors. Your campsite is shaping up, and as the campsite’s leader you need to make a flag. We’ve got you started with the basics for a flag and flagpole, but it is up to you to to make it your own.  \nYou can look to other flags for inspiration. Countries like France, Nigeria, Sweden, and Switzerland all have very simple color and shape designs, while Spain, Brazil, Kenya, and Saudi Arabia all feature complex designs. When you are done, share your flag to lay claim to your little bit of land!',
    icon_class  : 'challenge_flag',
    completion_text: 'You have a white canvas in front of you, use it wisely. Create the most amazing flag the world has ever seen!',
    img         : '/assets/summercamp/ch_pics/day_4.png',
    difficulty  : 1,
    startAt     : 3,
    summerCamp  : true,
    rewards     : {'outfit': 1},
    steps       : generate.fromSequence([
        [
            'Draw the sky where the flag will flutter - **type** `background blue`',
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
            'Let\'s move the cursor to place our flagpole in the correct place - **type** `moveTo 100, 100`',
            'moveTo 100, 100',
            [
                [ 'move-to', { x: 100, y: 100 } ]
            ]
        ],
        [
            'Set the `color` of the flagpole to `darkgray`',
            'color darkgray',
            [
                [ 'color', { color: palette.darkgray } ]
            ]
        ],
        [
            'Draw a long, thin pole with a rectangle - **type** `rectangle 10, 400`',
            'rectangle 10, 400',
            [
                [ 'rectangle', { width: 10, height: 400 } ]
            ]
        ],
        [
            'Move the cursor to place a ball on top-centre of the flagpole - **type** `move 5`',
            'move 5',
            [
                [ 'move-to', { dx: 5, dy: 0 } ]
            ]
        ],
        [
            'Set the `color` of the ornament to `gold`',
            'color gold',
            [
                [ 'color', { color: palette.gold } ]
            ]
        ],
        [
            'Draw a circle with a size of 8 - in a new line **type** `circle 8`',
            'circle 8',
            [
                [ 'ellipse', { rx: 8, isCircle: true } ]
            ]
        ],
        [
            'Now move the cursor to start drawing our flag - **type** `moveTo 115, 123`',
            'moveTo 115, 123',
            [
                [ 'move-to', { x: 115, y: 123 } ]
            ]
        ],
        [
            'Set the `color` of the flag to `white`',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw the flag with a `rectangle` of size `261` and  `171`',
            'rectangle 261, 171',
            [
                [ 'rectangle', { width: 261, height: 171 } ]
            ]
        ],
        [
            'That flag needs something to hold of to - **type** `moveTo 100, 140`',
            'moveTo 100, 140',
            [
                [ 'move-to', { x: 100, y: 140 } ]
            ]
        ],
        [
            'Set the `color` of the holder to `brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw the holder with a `20` by `5` `rectangle`',
            'rectangle 20, 5',
            [
                [ 'rectangle', { width: 20, height: 5 } ]
            ]
        ],
        [
            'Now is your turn! Draw an amazing pattern on it - **type** `moveTo 120, 125`',
            'moveTo 120, 125',
            [
                [ 'move-to', { x: 120, y: 125 } ]
            ]
        ],
    ])
};
