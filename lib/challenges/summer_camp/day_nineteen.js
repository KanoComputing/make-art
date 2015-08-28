var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_nineteen',
    title       : 'Foraging',
    short_title : 'Foraging',
    icon_class  : 'challenge_foraging',
    description : 'The wild is full of plants and fauna to eat. From stinging nettles, to mushrooms, and a multitude of berries, any meal can be improved with naturally growing foods. Berries are common in many parts of the world, and at Camp Kano they run wild even though they are hard to find. You might need to use your coding skills to find them.',
    img         : '/assets/summercamp/ch_pics/day_19.png',
    completion_text: 'But wait! Where are the berries you are meant to be foraging for? Use `color red`, `moveTo`, and `square 25` to add some extra berries to the scene!',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : {'wallpaper': 1},
    steps       : generate.fromSequence([
        [
            'Set `stroke` to `0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'It’s a bright sunny day! Set `background` to `blue`.',
            'background blue',
            [
                [ 'background', { color : palette.blue } ]
            ]
        ],
        [
            'Our foraging scene needs a grass field to start with. Set our drawing color to `green`.',
            'color green',
            [
                [ 'color', { color : palette.green } ]
            ]
        ],
        [
            'We want our grass on the bottom half of the screen, so let’s move into position with `moveTo 0, 300`',
            'moveTo 0, 300',
            [
                [ 'move-to', { x: 0, y: 300 } ]
            ]

        ],
        [
            'The grass is a nice big `rectangle` of size `500, 200`',
            'rectangle 500, 200',
            [
                [ 'rectangle', { width: 500, height: 200 } ]
            ]
        ],
        [
            'Now let’s add in a nice boxy tree to our foraging scene. Begin by moving into position at exactly `50, 100`.',
            'moveTo 50, 100',
            [
                [ 'move-to', { x: 50, y: 100 } ]
            ]
        ],
        [
            'Our leaves are drawn with `square 150`.',
            'square 150',
            [
                [ 'rectangle', { width: 150, isSquare: true } ]
            ]
        ],
        [
            'Next we need to draw the trunk. Move the cursor with `moveTo 100, 250`.',
            'moveTo 100, 250',
            [
                [ 'move-to', { x: 100, y: 250 } ]
            ]
        ],
        [
            'Our wood has a nice `darkbrown` color. Set that as the drawing color.',
            'color darkbrown',
            [
                [ 'color', { color: palette.darkbrown } ]
            ]
        ],
        [
            'The trunk is a `rectangle` with a width of `40` and a height of `150`',
            'rectangle 40, 150',
            [
                [ 'rectangle', { width: 40, height: 150 } ]
            ]
        ]
    ])
};


