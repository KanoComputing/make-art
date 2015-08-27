var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_twenty',
    title       : 'Fractal Tree',
    short_title : 'Tree',
    icon_class  : 'challenge_tree',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_20.png',
    completion_text: 'Well done! You made a function that can draw fireworks! Can you improve upon it? Draw them all over the screen, add in other creations and share it!',
    difficulty  : 3,
    startAt     : 0,
    summerCamp  : true,
    rewards     : {'outfit': 1},
    steps       : generate.fromSequence([
    ])
};
