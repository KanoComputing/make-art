var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_twentyone',
    title       : 'Fireworks',
    short_title : 'Fireworks',
    icon_class  : 'challenge_fireworks',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_21.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 3,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([

    ])
};
