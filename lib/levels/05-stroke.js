module.exports = {
    title: 'Stylish strokes!',
    validate: function (code) {
        return /^\n*stroke\s[0-9]+,\s*(")(red|green|yellow|orange|cyan|blue|grey|black|white)(")\n(.*)$/m.test(code);
    },
    code: '# Add stroke spell below this line\n\ncolor "red"\ncircle 200',
    slides: require('./05-stroke.md'),
    startAt: 2
};