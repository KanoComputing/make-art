var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'gradient',
    title       : 'Rainbow gradient',
    description : 'Combine for loops and colors to make something magical!',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Start by opening a for loop - **Type** `for i in [ 0 .. 32 ]`',
            'for i in [ 0 .. 32 ]',
            [
                [  'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now lets open a second for loop inside - **Type** `for j in [ 0 .. 32 ]`',
            'color red',
            [
                ['color', { color: palette.yellow }   ]
            ]
        ],
        [
            'Inside the for loop - ***type*** `color rotate green , (10*i + 10*j)`',
            'color rotate green , (10*i + 10*j)',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Now for the shapes - **type** `square 20`',
            'square 20',
            [
                [ 'rectangle', { width: 20, isSquare: true } ]
            ]
        ],
        [
            'Finally we need to move every time we draw - **type** `moveTo 20*i , 20*j`',
            'moveTo 20*i , 20*j',
            [
                [  'color', { color: palette.yellow } ]
            ]
        ],
    ])
};