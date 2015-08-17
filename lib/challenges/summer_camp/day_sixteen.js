var palette = require('../../language/modules/palette.json'),
    generate = require('./../util/generate');

module.exports = {
    id          : 'day_sixteen',
    title       : 'Tennis',
    short_title : 'Table Tennis',
    icon_class  : 'challenge_tennis',
    description : 'INFO TEXT',
    img         : '/assets/summercamp/ch_pics/day_16.png',
    completion_text: 'EXTRAS TEXT',
    difficulty  : 1,
    startAt     : 0,
    summerCamp  : true,
    rewards     : ['wallpaper'],
    steps       : generate.fromSequence([
        
    ])
};
