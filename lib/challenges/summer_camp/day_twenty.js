var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_twenty',
    title       : 'Fireworks',
    short_title : 'Fireworks',
    icon_class  : 'challenge_fireworks',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_20.png',
    completion_text: 'Well done! You made a function that can draw fireworks! Can you improve upon it? Draw them all over the screen, add in other creations and share it!',
    difficulty  : 3,
    startAt     : 0,
    summerCamp  : true,
    rewards     : ['wallpaper', 'outfit'],
    steps       : generate.fromSequence([
        [
            'The sun is down and the moon is new, let’s make the sky dark with `background black`',
            'background black',
            [
                [ 'background', { color: palette.black } ]
            ]
        ],
        [
            'Lets set the `stroke` to `red` for our firework',
            'stroke red',
            [
                ['stroke-color', { color: palette.red } ]
            ]
        ],
        [
            'We want to draw 60 lines radiating outward, so let’s use a for loop `for i in [ 0 .. 60 ]`',
            'for i in [ 0 .. 60 ]',
            [
                [ 'for-loop', { iterator: 'i', range: '0..60' } ]
            ]
        ],
        [
            'All of the lines in our firework should have different lengths! So for each line radiating out, let’s set its length with `length = random 1, 200`.',
            'length = random 1, 200',
            function () {
                var out = [],
                i;
                for (i = 0; i <= 60; i++) {
                    out.push( [ 'var', function (opts) {
                    return (opts.name === 'length' && opts.value === 'random1,200' );
                }]);
                }
                return out;
            }
        ],
        [
            'For each loop, we are drawing a new line radiating out. So for every time we loop, the angle of the line should change. This uses some advanced math, but don’t fear. Just **type** `angle = (360 / 60 * i) * (Math.PI / 180)`.',
            'angle = (360 / 60 * i) * (Math.PI / 180)',
            function () {
                var out = [],
                i;
                for (i = 0; i <= 60; i++) {
                    out.push( [ 'var', function (opts) {
                        console.log(opts);
                        return (opts.name === 'angle' && opts.value === '(360/60*i)*(Math.PI/180)' );
                }]);
                }
                return out;
            }
        ],
        [
            'Using this new angle and the random length let’s calculate where the x coordinate for the end of the radiating line should be. **Type** `dx = x + Math.sin(angle) * length`.',
            'dx = x + Math.sin(angle) * length',
            function () {
                var out = [],
                i;
                for (i = 0; i <= 60; i++) {
                    out.push( [ 'var', function (opts) {
                    return (opts.name === 'dx' && opts.value === '250+Math.sin(angle)*length' );
                }]);
                }
                return out;
            }
        ],
        [
            'Now let’s calculate the y coordinate for the end of the radiating line. **Type** `dy = y + Math.cos(angle) * length`.',
            'dy = y + Math.cos(angle) * length',
            function () {
                var out = [],
                i;
                for (i = 0; i <= 60; i++) {
                    out.push( [ 'var', function (opts) {
                    return (opts.name === 'dy' && opts.value === '250+Math.cos(angle)*length' );
                }]);
                }
                return out;
            }
        ],
        [
            'Finally, with all the coordinates set we are ready to draw the line. **Type** `lineTo dx, dy` ',
            'lineTo dx, dy',
            function () {
                var out = [],
                i;
                for (i = 0; i <= 60; i++) {
                    out.push( [ 'line', function (opts) {
                        return (typeof opts.dx === 'number')(typeof opts.dy === 'number');
                        }]
                    );
                }
                return out;
            }
        ]
    ])
};
