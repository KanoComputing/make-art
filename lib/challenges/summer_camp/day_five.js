var palette = require('../language/modules/palette.json'),
    generate = require('./util/generate');

module.exports = {
    id          : 'day_five',
    title       : 'TBD',
    description : 'TBD',
    startAt     : 0,
    summerCamp  : true,
    steps       : generate.fromSequence([
        [
            'Set the `background` color - **type** `background blue`',
            'background blue',
            [
                [ 'background', { color: palette.blue } ]
            ]
        ],
    ])
};