var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_twenty',
    title       : 'Tree',
    short_title : 'Tree',
    icon_class  : 'challenge_tree',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_20.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 3,
    startAt     : 0,
    summerCamp  : true,
    rewards     : null,
    steps       : generate.fromSequence([
        
    ])
};
