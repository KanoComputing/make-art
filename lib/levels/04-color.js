module.exports = {
    title: 'Colors!',
    validate: function (code) {
        return /^\n*color\s+"(red|green|yellow|orange|cyan|blue|grey|black|white)"\n(.*)$/.test(code);
    },
    code: '\n\n\ncircle 200',
    slides: require('./04-color.md')
};