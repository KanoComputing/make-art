module.exports = {

    title: 'Draw!',

    validate: function (code) {
        return /^circle\s+[0-9]+$/.test(code);
    },

    code: '# Write the command here!',

    slides: [
        'Start simple! Just draw a circle by writing\n\ncircle 100\n\nIn the editor, and see what happens',
        '[ Slide here ]'
    ]

};