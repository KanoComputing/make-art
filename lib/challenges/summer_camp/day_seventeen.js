var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_seventeen',
    title       : 'Fishing',
    short_title : 'Fishing',
    icon_class  : 'challenge_fishing',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_17.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        
    ])
};
