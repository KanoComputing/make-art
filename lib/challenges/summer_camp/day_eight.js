var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_eight',
    title       : 'Pack your things',
    short_title : 'Backpack',
    icon_class  : 'challenge_backpack',
    description : 'Dick Kelty is the inventor of the aluminium frame backpack. Kelty got the idea for his backpack in 1951 when he and a friend were hiking in the Sierra Nevada. Working in his garage, and with $500 borrowed against his house, Kelty and his wife went into production; he cut and welded the aluminium frames, while she stitched the nylon. They sold the finished backpacks for $24 apiece.',
    img         : '/assets/summercamp/ch_pics/day_8.png',
    completion_text: 'I have a big challenge for you: try drawing your character behind that backpack! Head, arms, legs… ',
    difficulty  : 1,
    startAt     : 0,
    rewards     : null,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'It\'s a beautiful day to go for a walk in the forest - **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Firstly, set the `stroke` to `0`, to avoid drawing the outlines of the shapes',
            'stroke 0',
            [
                [ 'stroke-width', { 'width': 0 } ]
            ]
        ],
        [
            'Move the cursor to place the floor - in a new line **type** `moveTo 0, 250`',
            'moveTo 0, 250',
            [
                [ 'move-to', { x: 0, y: 250 } ]
            ]
        ],
        [
            'Set the `color` of the grass to `green`',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'Draw the floor with a rectangle - **type** `rectangle 500, 250`',
            'rectangle 500, 250',
            [
                [ 'rectangle', { width: 500, height: 250 } ]
            ]
        ],
        [
            'This looks like a nice place for a tree - **type** `moveTo 220`',
            'moveTo 220',
            [
                [ 'move-to', { x: 220, y: 0 } ]
            ]
        ],
        [
            'Set the `color` of the trunk to `lightbrown`',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'Draw the trunk with a `rectangle` of size `50` by `400`',
            'rectangle 50, 400',
            [
                [ 'rectangle', { width: 50, height: 400 } ]
            ]
        ],
        [
            'Beautiful! Now it just needs some leaves - **type** `move 30, -120` to place them',
            'move 30, -120',
            [
                [ 'move-to', { dx: 30, dy: -120 } ]
            ]
        ],
        [
            'Set the `color` of the leaves to `darkgreen`',
            'color darkgreen',
            [
                [ 'color', { color: palette.darkgreen } ]
            ]
        ],
        [
            'Draw a `circle` to represent the leaves with size `200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Looking great! Let\'s move the cursor to place our backpack - **type** `moveTo 150, 200`',
            'moveTo 150, 200',
            [
                [ 'move-to', { x: 150, y: 200 } ]
            ]
        ],
        [
            'Let\'s choose `color` `brown` for our backpack',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw the main part of the rucksack with a square - **type** `square 200`',
            'square 200',
            [
                [ 'rectangle', { width: 200, height: 200 } ]
            ]
        ],
        [
            'Now move the cursor to bottom part of our backpack - **type** `moveTo 250, 400`',
            'moveTo 250, 400',
            [
                [ 'move-to', { x: 250, y: 400 } ]
            ]
        ],
        [
            'Draw the bottom using an ellipse - **type** `ellipse 100, 30`',
            'ellipse 100, 30',
            [
                [ 'ellipse', { rx: 100, ry: 30 } ]
            ]
        ],
        [
            'We need to store the sleeping bag at the top - **type** `moveTo 250, 200`',
            'moveTo 250, 200',
            [
                [ 'move-to', { x: 250, y: 200 } ]
            ]
        ],
        [
            'Set the `color` of the sleeping bag to `darkred`',
            'color darkred',
            [
                [ 'color', { color: palette.darkred } ]
            ]
        ],
        [
            'Ready to draw the sleeping bag? Use an ellipse - **type** `ellipse 115, 40`',
            'ellipse 115, 40',
            [
                [ 'ellipse', { rx: 115, ry: 40 } ]
            ]
        ],
        [
            'We need something to secure your sleeping bag to your backpack - **type** `moveTo 200, 160`',
            'moveTo 200, 160',
            [
                [ 'move-to', { x: 200, y: 160 } ]
            ]
        ],
        [
            'The `orangered` seems like a nice `color` for the holders',
            'color orangered',
            [
                [ 'color', { color: palette.orangered } ]
            ]
        ],
        [
            'Draw the left one first - **type** `rectangle 15, 90`',
            'rectangle 15, 90',
            [
                [ 'rectangle', { width: 15, height: 90 } ]
            ]
        ],
        [
            'Position the cursor to the right to draw the next holder - **type** `moveTo 290, 160`',
            'moveTo 290, 160',
            [
                [ 'move-to', { x: 290, y: 160 } ]
            ]
        ],
        [
            'Use a `rectangle` again for the right holder, same as the previous one',
            'rectangle 15, 90',
            [
                [ 'rectangle', { width: 15, height: 90 } ]
            ]
        ],
        [
            'Excellent! We need more storage space. Move the cursor to the middle - **type** `moveTo 205, 320`',
            'moveTo 205, 320',
            [
                [ 'move-to', { x: 205, y: 320 } ]
            ]
        ],
        [
            'Use a `rectangle` for the outside pocket, `90` by `60` will suffice',
            'rectangle 90, 60',
            [
                [ 'rectangle', { width: 90, height: 60 } ]
            ]
        ],
        [
            'That pocket needs to be closed so bugs can\'t get in - **type** `moveTo 250, 320`',
            'moveTo 250, 320',
            [
                [ 'move-to', { x: 250, y: 320 } ]
            ]
        ],
        [
            'Set the `color` to `lightbrown`',
            'color lightbrown',
            [
                [ 'color', { color: palette.lightbrown } ]
            ]
        ],
        [
            'An `ellipse` of size `48` by `7` will help here',
            'ellipse 48, 7',
            [
                [ 'ellipse', { rx: 48, ry: 7 } ]
            ]
        ],
        [
            'Looking great! Let\’s place a button on that pocket - **type** `moveTo 250, 330`',
            'moveTo 250, 330',
            [
                [ 'move-to', { x: 250, y: 330 } ]
            ]
        ],
        [
            'Set the `color` to `brown`',
            'color brown',
            [
                [ 'color', { color: palette.brown } ]
            ]
        ],
        [
            'Draw a `circle` button of size `10`',
            'circle 10',
            [
                [ 'ellipse', { rx: 10, isCircle: true } ]
            ]
        ],
    ])
};
