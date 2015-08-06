var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_five',
    title       : 'Camp badge',
    description : 'First Aid is the most popular merit badge. In fact, 6.9 million Scouts have earned it since its debut in 1911. Other popular ones are Environmental Science, Search and Rescue, and our favourites Programming and Game Design! There are some oddballs as well. For example Truck transportation: \“Assume that you are going to ship by truck 500 pounds of goods (freight class 65) from your town to another town 500 miles away. Your shipment must arrive within three days. Explain in writing…\”. And Nuclear Science \“Obtain a sample of irradiated and non-irradiated foods. Prepare the two foods and compare their taste and texture.\”',
    completion_text: 'This badge will distinguish your camp from others. Surprise the world with an amazing creation.',
    img         : '/assets/summercamp/ch_pics/day_5.png',
    difficulty  : 1,
    startAt     : 4,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Set the `background` color to `black`',
            'background black',
            [
                [ 'background', { color: palette.black } ]
            ]
        ],
        [
            'Set the `color` of your badge to `lightblue`',
            'color lightblue',
            [
                [ 'color', { color: palette.lightblue } ]
            ]
        ],
        [
            'Set the stroke for the first circle - **type** `stroke 20, red`',
            'stroke 20, red',
            [
                [ 'stroke-color', { color: palette.red } ],
                [ 'stroke-width', { width: 20 } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `200`',
            'circle 200',
            [
                [ 'ellipse', { rx: 200, isCircle: true } ]
            ]
        ],
        [
            'Set the stroke for the second circle - **type** `stroke 20, yellow`',
            'stroke 20, yellow',
            [
                [ 'stroke-color', { color: palette.yellow } ],
                [ 'stroke-width', { width: 20 } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `190`',
            'circle 190',
            [
                [ 'ellipse', { rx: 190, isCircle: true } ]
            ]
        ],
        [
            'Set the `stroke` for the third circle to size `20` and `purple` color',
            'stroke 20, purple',
            [
                [ 'stroke-color', { color: palette.purple } ],
                [ 'stroke-width', { width: 20 } ]
            ]
        ],
        [
            'Draw a `circle` with a size of `180`',
            'circle 180',
            [
                [ 'ellipse', { rx: 180, isCircle: true } ]
            ]
        ],
        [
            'Add some decoration inside. Set the `color` to `green`',
            'color green',
            [
                [ 'color', { color: palette.green } ]
            ]
        ],
        [
            'An arc is part of a cirlce, draw one that matches the inner circle - **type** `arc 180, 1, 2`',
            'arc 180, 1, 2',
            [
                [ 'arc', { radius: 180, start: 1, end: 2 } ]
            ]
        ]
    ])
};