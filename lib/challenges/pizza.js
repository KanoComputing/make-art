var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'pizza',
    title       : 'Code a Pizza',
    description : 'Code yourself a tasty pizza!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the `stroke` to `beige` and `50`',
            'stroke beige, 50',
            [
                [ 'stroke-color', { color: palette.beige } ],                
                [ 'stroke-width', { width: 50 } ]
            ]
        ],
        [
            'Set the `color` to `red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw a `circle` with size `200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Looking tasty! Set the `stroke` back to `0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Top it with a cheesey `yellow` `circle` of size `195`',
            'color yellow\ncircle 195',
            [
                [ 'color', { color: palette.yellow } ],
                [ 'ellipse', { rx: 195, isCircle: true } ]
            ]
        ],
        [
            'It\'s not pizza without toppings - set the `color` to `darkred`',
            'color darkred',
            [
                [ 'color', { color: palette.darkred } ]
            ]
        ],
        [
            'Now `moveTo` `164, 290`',
            'moveTo 164, 290',
            [
                [ 'move-to', { x: 164, y: 290 } ]
            ]
        ],
        [
            'Nice - now draw a `circle` with size `20`',
            'circle 20',
            [
                [ 'ellipse', { rx: 20, isCircle: true } ]
            ]
        ]
    ])
};
