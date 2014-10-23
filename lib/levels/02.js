module.exports = {

    title: 'Draw!',

    validate: function (code) {
        return /^square\s+[0-9]+$/.test(code);
    },

    code: ' ',

    slides: [
        'Now draw a square!\n\nsquare 100\n\nNote: Unlike the circle, the cursor will be its top-left corner, not its center'
    ]

};