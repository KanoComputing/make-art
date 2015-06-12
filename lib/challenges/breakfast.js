var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'breakfast',
    title       : 'Breakfast',
    description : 'Draw a bacon and eggs breakfast!',
    startAt     : 2,
    steps       : generate.fromSequence([
        [
            'Set the background to blue - **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Set the stroke to 0, to avoid drawing lines',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Set the color to white',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw a circle with a size of 240',
            '\n#Plate\ncircle 240',
            [
                [ 'ellipse', { rx: 240, isCircle: true } ]
            ]
        ],
        [
            'Set the color to `\'#eee\'` - **type** `color \'#eee\'`',
            'color \'#eee\'',
            [
                [ 'color', { color: '#eee' } ]
            ]
        ],
        [
            'Draw a circle with a size of 200',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Move up and left - **type** `move -70, -70`',
            '\n#Egg\nmove -70, -70',
            [
                [ 'move-to', { dx: -70, dy: -70 } ]
            ]
        ],
        [
            'Set the color to white',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw a circle with a size of 80',
            'circle 80',
            [
                [ 'ellipse', { rx: 80, isCircle: true } ]
            ]
        ],
        [
            'Set the color to yellow',
            'color yellow',
            [
                [ 'color', { color: palette.yellow } ]
            ]
        ],
        [
            'Draw a circle with a size of 30',
            'circle 30',
            [
                [ 'ellipse', { rx: 30, isCircle: true } ]
            ]
        ],
        [
            'Move down and left - **type** `move 90, -60`',
            '\n#Bacon 1\nmove 90, -60',
            [
                [ 'move-to', { dx: 90, dy: -60 } ]
            ]
        ],
        [
            'Set the color to red',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw a rectangle with a size of 60 and 200 - **type** `rectangle 60, 200`',
            'rectangle 60, 200',
            [
                [ 'rectangle', { width: 60, height: 200 } ]
            ]
        ],
        [
            'Move 30 to the right - **type** `move 30`',
            'move 30',
            [
                [ 'move-to', { dx: 30, dy: 0 } ]
            ]
        ],
        [
            'Set the color to `\'#aa0000\'` - **type** `color \'#aa0000\'`',
            'color #aa0000',
            [
                [ 'color', { color: '#aa0000' } ]
            ]
        ],
        [
            'Draw a rectangle with a size of 30 and 200 - **type** `rectangle 30, 200`',
            'rectangle 30, 200',
            [
                [ 'rectangle', { width: 30, height: 200 } ]
            ]
        ],
        [
            'Move up and right - **type** `move -3, 10`',
            'move -3, 10',
            [
                [ 'move-to', { dx: -3, dy: 10 } ]
            ]
        ],
        [
            'Set the color to white',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw a rectangle with a size of 6 and 180 - **type** `rectangle 6, 180`',
            'rectangle 6, 180',
            [
                [ 'rectangle', { width: 6, height: 180 } ]
            ]
        ],
        [
            'Move down and right - **type** `move 40, 50`',
            '\n#Bacon 2\nmove 40, 50',
            [
                [ 'move-to', { dx: 40, dy: 50 } ]
            ]
        ],
        [
            'Set the color to red',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw a rectangle with a size of 60 and 200 - **type** `rectangle 60, 200`',
            'rectangle 60, 200',
            [
                [ 'rectangle', { width: 60, height: 200 } ]
            ]
        ],
        [
            'Move 30 to the right - **type** `move 30`',
            'move 30',
            [
                [ 'move-to', { dx: 30, dy: 0 } ]
            ]
        ],
        [
            'Set the color to `\'#aa0000\'` - **type** `color \'#aa0000\'`',
            'color #aa0000',
            [
                [ 'color', { color: '#aa0000' } ]
            ]
        ],
        [
            'Draw a rectangle with a size of 30 and 200 - **type** `rectangle 30, 200`',
            'rectangle 30, 200',
            [
                [ 'rectangle', { width: 30, height: 200 } ]
            ]
        ],
        [
            'Move up and right - **type** `move -3, 10`',
            'move -3, 10',
            [
                [ 'move-to', { dx: -3, dy: 10 } ]
            ]
        ],
        [
            'Set the color to white',
            'color white',
            [
                [ 'color', { color: palette.white } ]
            ]
        ],
        [
            'Draw a rectangle with a size of 6 and 180 - **type** `rectangle 6, 180`',
            'rectangle 6, 180',
            [
                [ 'rectangle', { width: 6, height: 180 } ]
            ]
        ],
        [
            'Move up and right - **type** `move -200, 150`',
            '\n#Tomato 1\nmove -200, 150',
            [
                [ 'move-to', { dx: -200, dy: 150 } ]
            ]
        ],
        [
            'Set the color to red',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw a circle with a size of 40',
            'circle 40',
            [
                [ 'ellipse', { rx: 40, isCircle: true } ]
            ]
        ],
        [
            'Set the color to `\'#cc4444\'` - **type** `color \'#cc4444\'`',
            'color \'#cc4444\'',
            [
                [ 'color', { color: '#cc4444' } ]
            ]
        ],
        [
            'Draw a circle with a size of 35',
            'circle 35',
            [
                [ 'ellipse', { rx: 35, isCircle: true } ]
            ]
        ],
        [
            'Set the color to `\'#aa4444\'` - **type** `color \'#aa4444\'`',
            'color \'#aa4444\'',
            [
                [ 'color', { color: '#aa4444' } ]
            ]
        ],
        [
            'Draw an ellipse with a size of 30 and 10',
            'ellipse 30, 10',
            [
                [ 'ellipse', { rx: 30, ry: 10 } ]
            ]
        ],
        [
            'Draw an ellipse with a size of 10 and 30',
            'ellipse 10, 30',
            [
                [ 'ellipse', { rx: 10, ry: 30 } ]
            ]
        ],
        [
            'Move up and left - **type** `move 70, 50`',
            '\n#Tomato 2\nmove 70, 50',
            [
                [ 'move-to', { dx: 70, dy: 50 } ]
            ]
        ],
        [
            'Set the color to red',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Draw a circle with a size of 40',
            'circle 40',
            [
                [ 'ellipse', { rx: 40, isCircle: true } ]
            ]
        ],
        [
            'Set the color to `\'#cc4444\'` - **type** `color \'#cc4444\'`',
            'color \'#cc4444\'',
            [
                [ 'color', { color: '#cc4444' } ]
            ]
        ],
        [
            'Draw a circle with a size of 35',
            'circle 35',
            [
                [ 'ellipse', { rx: 35, isCircle: true } ]
            ]
        ],
        [
            'Set the color to `\'#aa4444\'` - **type** `color \'#aa4444\'`',
            'color \'#aa4444\'',
            [
                [ 'color', { color: '#aa4444' } ]
            ]
        ],
        [
            'Draw an ellipse with a size of 30 and 10',
            'ellipse 30, 10',
            [
                [ 'ellipse', { rx: 30, ry: 10 } ]
            ]
        ],
        [
            'Draw an ellipse with a size of 10 and 30',
            'ellipse 10, 30',
            [
                [ 'ellipse', { rx: 10, ry: 30 } ]
            ]
        ]
    ])
};
