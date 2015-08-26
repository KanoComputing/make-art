var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_eighteen',
    title       : 'Hiking Poster',
    short_title : 'Hiking',
    icon_class  : 'challenge_hiking',
    description : 'The beautiful Camp Kano mountain range is known for its deep blue colour. The ten mountains in the range always seem to be changing position though, which makes for a dangerous climb. Should campers attempt to climb it? Who knows! But management wants an advertising posts so get to it.',
    img         : '/assets/summercamp/ch_pics/day_18.png',
    completion_text: 'Well done, you’ve made a beautiful poster! Now play around with the random values and the text. What else is the poster missing?',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        [
            'Up above the clouds the sky is blue, **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
        [
            'Camp Kano’s mountains are a beautiful shade of dark blue. Set the drawing colour with `color darkblue`.',
            'color darkblue',
            [
                [ 'color', { color: palette.darkblue } ]
            ]
        ],
        [
            'The mountains also have a nice thick border, give them `stroke 10, white`',
            'stroke 10, white',
            [
                [ 'stroke-color', { color: palette.white } ],
                [ 'stroke-width', { width: 10 } ]
            ]
        ],

        
        [
            'Lets draw the ten mountains of Camp Kano with a loop! This will be much faster than drawing them individually. **Type** `for i in [ 0 ... 10 ]` to open the loop.',
            'for i in [ 0 ... 10 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0...10' } ]
            ]
        ],
        [
            'For every time the loop runs, we want a mountain’s peak to be drawn randomly across the screen. Let’s select an x value with `x = random 0, 500`',
            'x = random 0, 500',
            function () { // None of the looping works with or without the
                var out = [];
                for (var i = 0; i < 10; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                }
                return out;
            }
        ],
        [
            'However, for the y value, we only want each mountain’s peak to be drawn on the top part of the screen. **Type** `y = random 0, 200`',
            'y = random 0, 200',
            function () {
                var out = [];
                var i = 0;
                for (i = 0; i < 10; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                    out.push([ 'var', function (opts) {
                        return opts.name === 'y' && opts.value === 'random0,200'
                    }]);
                }
                return out;
            },
            {override: true}
        ],
        [
            'Now with our x and y values set we can move the cursor to them. **Type** `moveTo x, y`',
            'moveTo x, y',
            function () {
                var out = [];
                for (var i = 0; i < 10; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                    out.push([ 'var', function (opts) {
                        return opts.name === 'y' && opts.value === 'random0,200'
                    }]);
                    out.push(
                        ['move-to', function (opts) {
                            return (opts.x >= 0 && opts.x <= 500) && (opts.y > 0 && opts.y <= 200)
                        }]
                    );
                }
                return out;
            },
            {override: true}
        ],
        [
            'Draw a mountain for every loop with the polygon function. **Type** `polygon 400, 500, -400, 500`',
            'polygon 400, 500, -400, 500',
            function () {
                var out = [];
                var i = 0;

                for (i = 0; i < 10; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                    out.push([ 'var', function (opts) {
                        return opts.name === 'y' && opts.value === 'random0,200'
                    }]);
                    out.push(
                        ['move-to', function (opts) {
                            return (opts.x >= 0 && opts.x <= 500) && (opts.y > 0 && opts.y <= 200)
                        }]
                    );
                    out.push(
                        [ 'polygon', { points: [
                            { x: 0, y: 0 },
                            { x: 400, y: 500 },
                            { x: -400, y: 500 }
                        ]}]
                    );
                }
                return out;
            },
            {override: true}
        ],
        [
            'First, get out of the previous for loop’s indent by pressing `BACKSPACE`. Now let’s draw some clouds with `stroke 0`',
            'stroke 0',
            [
                [ 'stroke-width', { width: 0 } ]
            ]
        ],
        [
            'Clouds are made of small droplets of water vapor, which is see-through! To get a see-through color we use the `opacity` function. **Type** `color (opacity white, .1)`',
            'color(opacity white, .1)',
            [
                [ 'color', { color: 'rgba(255, 255, 255, 0.1)' } ]
            ]
        ],
        [
            'Now let’s make a new loop to draw the cloud puffs. We’ll need a lot, so let’s make this a loop last 300 iterations. **Type** `for j in [ 0 ... 250 ]`.',
            'for j in [ 0 ... 250 ]',
            [
                [ 'for-loop', { iterator: 'j', range: '0...250' } ]
            ]
        ],
        [
            'We want cloud puffs sprinkled randomly across the screen, so lets choose an x value between 0 and 500 with`x = random 0, 500`',
            'x = random 0, 500',
            function () {
                var out = [];
                var i=0;
                for (i = 0; i < 250; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                }
                return out;
            }
        ],
        [
            'However, for the y value, we only want the cloud puffs to be drawn on the bottom part of the screen. **Type** `y = random 300, 500`',
            'y = random 300, 500',
            function () {
                var out = [];
                for (var i = 0; i < 250; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                    out.push([ 'var', function (opts) {
                        return opts.name === 'y' && opts.value === 'random300,500';
                    }]);
                }
                return out;
            },
            {override: true}
        ],
        [
            'Now with our x and y values set we can move the cursor to them. **Type** `moveTo x, y`',
            'moveTo x, y',
            function () {
                var out = [];
                for (var i = 0; i < 250; i++) {
                     out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                    out.push([ 'var', function (opts) {
                        return opts.name === 'y' && opts.value === 'random300,500';
                    }]);
                    out.push(
                        ['move-to', function (opts) {
                            return (opts.x >= 0 && opts.x <= 500) && (opts.y >= 300 && opts.y <= 500);
                        }]
                    );
                }
                return out;
            },
            {override: true}
        ],
        [
            'Let’s draw the cloud puff—a big transparent `circle` of size `100`',
            'color blue',
            function () {
                var out = [];
                for (var i = 0; i < 250; i++) {
                    out.push([ 'var', function (opts) {
                        return opts.name === 'x' && opts.value === 'random0,500';
                    }]);
                    out.push([ 'var', function (opts) {

                        return opts.name === 'y' && opts.value === 'random300,500';
                    }]);
                    out.push(
                        ['move-to', function (opts) {
                            return (opts.x >= 0 && opts.x <= 500) && (opts.y >= 300 && opts.y <= 500);
                        }]
                    );
                    out.push([ 'ellipse', { rx: 100, isCircle: true } ]);
                }
                return out;
            },
            {override: true}
        ],
        [
            'Press `BACKSPACE` once to get out of the indented line. Then lets move the cursor into place for some text with `moveTo 250, 350`',
            'moveTo 250, 350',
            [
                [ 'move-to', { x: 250, y: 350 } ]
            ]
        ],
        [
            'Set the drawing color to red - **type** `color red`',
            'color red',
            [
                [ 'color', { color: palette.red } ]
            ]
        ],
        [
            'Our message should be strong and impactful, so lets set the font to bold with `bold true`',
            'bold true',
            [
                [ 'text-bold', {state: true}  ]
            ]
        ],
        [
            'We also want to style our text with italics, do this with `italic true`',
            'bold true',
            [
                [ 'text-italic', { state: true } ]
            ]
        ],
        [
            'Finally lets select Bariol at point size 40 with `font \'Bariol\', 40`',
            'font \'Bariol\', 40',
            [
                [ 'font-family', { font: 'Bariol' } ],
                [ 'text-size', { size: '40' } ]
            ]
        ],
        [
            'Start your message off with `text \'Hike the Blue Mountains of\'`',
            'text \'Hike the Blue Mountains of\'',
            [
                [ 'text', { value: 'Hike the Blue Mountains of' } ]
            ]
        ],
        [
            'Now for a new line with a big bold finish. **Type** `font 90`',
            'font \'Bariol\', 90',
            [
                [ 'text-size', { size: '90' } ]
            ]
        ],
        [
            'Lets move the cursor down into place for the final line with `move 0, 90`',
            'move 0, 90',
            [
                [ 'move-to', { dx: 0, dy: 90 } ]
            ]
        ],
        [
            'The finishing touch: **type** `text \'Camp Kano!\'`',
            'text \'Camp Kano!\'',
            [
                [ 'text', { value: 'Camp Kano!' } ]
            ]
        ]
    ])
};
