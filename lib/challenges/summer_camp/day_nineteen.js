var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_nineteen',
    title       : 'Horse riding',
    short_title : 'Horse riding',
    icon_class  : 'challenge_horse',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_19.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : ['outfit'],
    steps       : generate.fromSequence([
        
    ])
};
