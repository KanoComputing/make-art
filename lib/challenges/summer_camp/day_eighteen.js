var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_eighteen',
    title       : 'Climbing',
    short_title : 'Climbing',
    icon_class  : 'challenge_climbing',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_18.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        
    ])
};
