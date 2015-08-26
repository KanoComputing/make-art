var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_nine',
    title       : 'A compass is an essential tool',
    short_title : 'Compass',
    icon_class  : 'challenge_compass',
    description : 'Essentially a compass is a magnet, generally a magnetized needle. Since opposites attract the southern pole of the needle is attracted to the Earth\'s natural magnetic north pole. Did you know that you can create your own simply with a paperclip, cork and a magnet?',
    img         : '/assets/summercamp/ch_pics/day_9.png',
    completion_text: 'Now try adding the rest of the \'compass rose\' components: the other cardinal directions (E, S, W and even NE, NW, SE and SW). Why not a hand holding it?',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : {'wallpaper': 1},
    steps       : generate.fromSequence([
        [
            'Select `lightgray` for the `background`',
            'background lightgray',
            [
                [ 'background', { color: palette.lightgray } ]
            ]
        ],
        [
            'In a new line, set the outline of your compass with a `stroke` of `20` and `gold` color',
            'stroke gold, 20',
            [
                [ 'stroke-color', { color: palette.gold } ],
                [ 'stroke-width', { 'width': 20 } ]
            ]
        ],
        [
            'Set the `color` of the compass to `gray`',
            'color gray',
            [
                [ 'color', { color: palette.gray } ]
            ]
        ],
        [
             'Your compass is a `circle` with size `110`',
             'circle 110',
            [
                 [ 'ellipse', { rx: 110, isCircle: true } ]
            ]
        ],
        [
            'Set the `color` to `darkgray` for the second half of the compass',
            'color darkgray',
            [
                [ 'color', { color: palette.darkgray } ]
            ]
        ],
        [
            'Set the `stroke` back to `0`',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Draw an arc that matches the top half of the compass - **type** `arc 105, 2, 1`',
            'arc 105, 2, 1',
            [
                [ 'arc', { radius: 105, start: 2, end: 1 } ]
            ]
        ],
        [
            'We need to mark the north somehow - in a new line **type** `moveTo 250, 175`',
            'moveTo 250, 175',
            [
                [ 'move-to', { x: 250, y: 175 } ]
            ]
        ],
        [
            'Set the `color` to `gold`',
            'color gold',
            [
                [ 'color', { color: palette.gold } ]
            ]
        ],
        [
            'Set the `font` to `\'cursive\'` and size `25`',
            'font \'cursive\', 25',
            [
                [ 'font-family', { font: 'cursive' } ],
                [ 'text-size', { size: '25' } ],
            ]
        ],
        [
            'Write an N to represent north - **type** `text \'N\'`',
            'text \'N\'',
            [
                [ 'text', { value: 'N' } ]
            ]
        ],   
        [
            'Now we need a needle with 2 sides. Set the `color` to `red` for the first side',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Move the cursor to position the needle **type** `moveTo 230, 250`',
            'moveTo 230, 250',
            [
                [ 'move-to', { x: 230, y: 250 } ]
            ]
        ],
        [
            'Draw a triangle with a polygon - **type** `polygon 20, -90, 40, 0`',
            'polygon 20, -90, 40, 0',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 20, y: -90 },
                    { x: 40, y: -0 }
                ] } ]
            ]
        ],
        [
            'Excellent! Set the `color` to `white` for the second side of the needle',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw the second part - **type** `polygon 20, 90, 40, 0`',
            'polygon 20, 90, 40, 0',
            [
                [ 'polygon', { points: [
                    { x: 0, y: -0 },
                    { x: 20, y: 90 },
                    { x: 40, y: -0 }
                ] } ]
            ]
        ],
        [
            'Finish it with one last detail. Set the `color` to `gold`',
            'color gold',
            [
                [ 'color', { color: palette.gold } ]
            ]
        ],
        [
            'Move the cursor to the center of the compass **type** `move 20`',
            'move 20',
            [
                [ 'move-to', { dx: 20, dy: 0 } ]
            ]
        ],
        [
             'Draw a `circle` of size `20`',
             'circle 20',
            [
                 [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ] 
    ])
};
