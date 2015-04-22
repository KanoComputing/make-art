var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'starry-sky',
    title       : 'Starry sky',
    description : 'Code your own starry night sky!',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the background to dark blue - **type** `background darkblue`',
            'background darkblue',
            [
                [ 'background', { color: palette.darkblue } ]
            ]
        ],
        [
            'Now set the stroke to 0 - **type** `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'And set the shape color - **type** `color yellow`',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now let\'s open a loop - **type** `for i in [ 0 .. 32 ]`',
            'for i in [ 0 .. 32 ]',
            [
                //win condition
                [  'color', { color: palette.green }  ]
            ]
        ],
        [
            'Draw a circle with a radius of 5 - In a new line, **type** `circle 5`',
            'circle 5',
            [
                [ 'ellipse', { rx: 5, isCircle: true } ]
            ]
        ],
                [
            'Now to set where they go -  **type** `moveTo (random 0, 460), (random 0, 460)`',
            'moveTo (random 0, 460), (random 0, 460)',
            [
//                [  'moveTo', { dx, dy} ]
            ]
        ],
    ])
};