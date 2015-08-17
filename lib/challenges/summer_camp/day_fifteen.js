var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_fifteen',
    title       : 'Bow',
    short_title : 'Bow',
    icon_class  : 'challenge_bow',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_15.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        
    ])
};
