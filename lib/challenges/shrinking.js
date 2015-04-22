var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'shrinking',
    title       : 'Shrinking Circles',
    description : 'Ever shrinking circles with a for loop!',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the stroke - **type** `stroke gray, 3`',
            'stroke gray, 3',
            [
                [ 'stroke-color', { color: palette.gray } ],
                [ 'stroke-width', { width: 3 } ]
            ]
        ],
        [
            'Set the color to see through - In a new line, **type** `color null`',
            'color null',
            [
                [ 'color', { color: null } ]
            ]
        ],
        [
            'Now let\'s open a loop - **type** `for i in [ 0 .. 32 ]`',
            'for i in [ 0 .. 32 ]',
            [
                [  'color', { color: palette.green }  ]
            ]
        ],
        [
            'Awesome, let\'s draw some circles - inside the for loop **type** `circle 10*i`',
            'circle 10*i',
            [
                [ 'ellipse', { rx: 100, isCircle: true } ]
            ]
        ],
    ])
};