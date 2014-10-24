module.exports = {
    title: 'Colors!',
    validate: function (code) {
        return /^\n*color\s+(")(red|green|yellow|orange|cyan|blue|grey|black|white)(")\n(.*)$/m.test(code);
    },
    code: '# Add the color spell before the circle\n\n\ncircle 200',
    slides: require('./04-color.md'),
    startAt: 3
};