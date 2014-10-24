module.exports = {
    title: 'Comments!',
    validate: function (code) {
        return code === 'color \'orange\'\nstroke 0\ncircle 200\ncolor \'black\'\nmove 0,40\ncircle 100\nmove -100, -100\ncolor \'orange\'\nrectangle 200, 100\nmove 50, -10\ncolor \'black\'\ncircle 20\nmove 100\ncircle 20';
    },
    code: '#color \'orange\'\nstroke 0\ncircle 200\ncolor \'black\'\n#move 0,40\ncircle 100\n#move -100, -100\ncolor \'orange\'\nrectangle 200, 100\n#move 50, -10\n#color \'black\'\ncircle 20\n#move 100\ncircle 20',
    slides: require('./07-comment.md'),
    startAt: 1
};