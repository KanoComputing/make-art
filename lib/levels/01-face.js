var slides = require('./01-face.md'),
    palette = require('../language/modules/palette.json');

module.exports = {
    title: 'Your first face',
    description: 'Draw a face',
    steps: [

        // Verify a circle of radius 200 was drawn
        function () {
            return (
                this.hasSteps(1) &&
                this.hasDrawnCircle(null, null, 200)
            );
        },

        function () {
            return (
                this.hasStepLike('color', { color: palette.yellow }, 0) &&
                this.hasDrawnCircle(null, null, 200, 1)
            );
        }

    ],
    code: '# Write the spell just below this line\n',
    slides: slides,
    startAt: 2
};
