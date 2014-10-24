module.exports = {
    title: 'Now with a square!',
    validate: function (code) {
        return /^square\s+[0-9]+$/m.test(code);
    },
    code: '###\nDo the same as previously, but use\nthe \'square\' spell this time\n###\n',
    startAt: 5,
    slides: require('./02-square.md')
};