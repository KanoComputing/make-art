module.exports = {
    title: 'VARIABLES',
    description: 'Create values that you can reuse',
    validate: function (code) {
        return code.match(/^carColor = \'blue\'\nstroke 0\nmove -150, -20\ncolor carColor\nrectangle 300, 100\ncolor \'black\'\nmove 70, 100\ncircle 50\ncolor \'gray\'\ncircle 30\ncolor \'black\'\nmove 160\ncircle 50\ncolor \'gray\'\ncircle 30\nmove -200, -180\ncolor carColor\nrectangle 240, 80\nmove 20, 20\ncolor \'lightblue\'\nrectangle 90, 60\nmove 110\nrectangle 90, 60\nmove -240, 210\ncolor \'grey\'\nrectangle 460, 100$/m);
    },
    code: 'carColor = \'red\'\n\nstroke 0\nmove -150, -20\ncolor carColor\nrectangle 300, 100\ncolor \'black\'\nmove 70, 100\ncircle 50\ncolor \'gray\'\ncircle 30\ncolor \'black\'\nmove 160\ncircle 50\ncolor \'gray\'\ncircle 30\nmove -200, -180\ncolor carColor\nrectangle 240, 80\nmove 20, 20\ncolor \'lightblue\'\nrectangle 90, 60\nmove 110\nrectangle 90, 60\nmove -240, 210\ncolor \'grey\'\nrectangle 460, 100',
    slides: require('./08-variable.md'),
    startAt: 1
};
