var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_fifteen',
    title       : 'Bow',
    short_title : 'Bow',
    icon_class  : 'challenge_bow',
    description : 'Shooting a bow and arrow at a target is an art that requires lots of focus. This challenge is to draw a bow and try to hold it steady while your hand jitters...just like the other humans who have used the bow and arrow for hunting since the dawn of civilization over ten thousand years ago. The oldest known bow, found in Denmark, dates from 9000 BCE!',
    img         : '/assets/summercamp/ch_pics/day_15.png',
    completion_text: 'Click Refresh and watch the target move while you try to hold your bow steady! Try getting rid of the moving background to make it easier to hit the target, converting your bow to a crossbow, or drawing an arrow in the bullseye.',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        [
            'The weather is good today-there is no wind to blow our arrows. Set the background color to blue - **type** `background blue`.',
            'background lightblue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'We want the background to jitter, so we will start drawing it at a random point. **Type** `moveTo (random -20, 0), (random 240, 260)`.',
            'moveTo (random -20, 0), (random 240, 260)',
            [
                [ 'move-to', function (options) {
                    return options.x >= -20
                            && options.x <= 0
                            && options.y >= 240
                            && options.y <= 260
                }]
            ]
        ],
        [
            'Our target is in a grassy field, so let\s get our `color green` ready',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Draw a big `rectangle` that is `550` high and `300` wide for the grass',
            'rectangle 550, 300',
            [
                [ 'rectangle', { width: 550, height: 300 } ]
            ]
        ],
        [
            'Now let\'s move the cursor to draw our target - **type** `move 275, 10`',
            'move 275, 10',
            [
                [ 'move-to', { dx: 275, dy: 10 } ]
            ]
        ],
        [
            'First we will draw the wooden legs supporting it - **type** `stroke 15, brown`',
            'stroke 15, brown',
            [
                [ 'stroke-color', { color: palette.brown } ],
                [ 'stroke-width', { width: 15 } ]
            ]
        ],
        [
            'Draw the left leg - **type** `line -80, 120`...',
            'line -80, 120',
            [
                [ 'line', { dx: -80, dy: 120 } ]
            ]
        ],
        [
            '...and now draw the right leg - **type** `line 80, 120`',
            'line 80, 120',
            [
                [ 'line', { dx: 80, dy: 120 } ]
            ]
        ],
        [
            'We will draw a target with white and red rings - **type** `stroke 50, white`',
            'stroke 50, white',
            [
                [ 'stroke-color', { color: palette.white } ],
                [ 'stroke-width', { width: 50 } ]
            ]
        ],
        [
            'Now make the inside of the circle red - **type** `color red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'First, draw a circle of radius 80 - **type** `circle 80`',
            'circle 80',
            [
                [ 'ellipse', { rx: 80, isCircle: true } ]
            ]
        ],
        [
            'Second, draw a `circle` of radius `30`',
            'circle 30',
            [
                [ 'ellipse', { rx: 30, isCircle: true } ]
            ]
        ],
        [
            'Move the cursor to draw an arrowhead - **type** `moveTo 250, 220`',
            'moveTo 250, 220',
            [
                [ 'move-to', { x: 250, y: 220 } ]
            ]
        ],
        [
            'Our arrowhead will have a thin gray outline - **type** `stroke 1, gray`',
            'stroke 1, gray',
            [
                [ 'stroke-color', { color: palette.gray } ],
                [ 'stroke-width', { width: 1 } ]
            ]
        ],
        [
            'The flint arrowhead is going to have the `color dimgray`',
            'color dimgray',
            [
                [ 'color', { color: palette.dimgray } ]
            ]
        ],
        [
            'Draw the arrowhead as a diamond - **type** `polygon -10, 40, 0, 80, 10, 40`',
            'polygon -10, 40, 0, 80, 10, 40',
            [
                [ 'polygon', { points: [
                    { x: 0, y: 0 },
                    { x: -10, y: 40 },
                    { x: 0, y: 80 },
                    { x: 10, y: 40 }
                ] } ]
            ]
        ],
        [
            'Next we will move to draw the shaft of the arrow - **type** `move 0, 40`',
            'move 0, 40',
            [
                [ 'move-to', { dx: 0, dy: 40 } ]
            ]
        ],
        [
            'The arrow will be made of a light brown wood - **type** `stroke 20, lightbrown`',
            'stroke 20, lightbrown',
            [
                [ 'stroke-color', { color: palette.lightbrown } ],
                [ 'stroke-width', { width: 20 } ]
            ]
        ],
        [
            'Draw a line for the shaft - **type** `line 200, 360`',
            'line 200, 360',
            [
                [ 'line', { dx: 200, dy: 360 } ]
            ]
        ],
        [
            'The last thing we will draw is our bow. Move the cursor off the screen - **type** `moveTo 800, 375`',
            'moveTo 800, 375',
            [
                [ 'move-to', { x: 800, y: 375 } ]
            ]
        ],
        [
            'We are going to draw an arc for the bow so let\'s draw it with a thick piece of dark brown wood - **type** `stroke 40, \'#5E4323\'`',
            'stroke 40, \'#5E4323\'',
            [
                [ 'stroke-color', { color: '#5E4323' } ],
                [ 'stroke-width', { width: 40 } ]
            ]
        ],        
        [
            'We don\'t want the arc to have any fill - **type** `color null`',
            'color null',
            [
                [ 'color', null ]
            ]
        ],
        [
            'Draw the bow with a big arc centered far off the screen - **type** `arc 500, 0, 2`',
            'arc 500, 0, 2',
            [
                [ 'arc', { radius: 500, start: 0, end: 2 }]
            ]
        ],
    ])
};
