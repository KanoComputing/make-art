var palette = require('../language/modules/palette.json');

module.exports = {
    title       : 'Stare in the dark',
    description : 'Draw a pair of staring eyes in the dark',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : [
        {

            hint     : 'Set the background to black: ***Type*** `background black`',
            solution : [
                'background black'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ]
                ]);
            }
        },
        {
            hint     : 'Move to the left by 80: ***In a new line, type*** `move -80`',
            solution : [
                'background black',
                'move -80'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ]
                ]);
            }
        },
        {
            hint     : 'Choose a white color: ***In a new line, type*** `color white`',
            solution : [
                'background black',
                'move -80',
                'color white'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ]
                ]);
            }
        },
        {
            hint     : 'Draw an ellipse: ***In a new line, type*** `ellipse 60, 40`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ]
                ]);
            }
        },
        {
            hint     : 'Choose a black color: ***In a new line, type*** `color black`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                ]);
            }
        },
        {
            hint     : 'Draw an circle with a radius of 10: ***In a new line, type*** `circle 10`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black',
                'circle 10'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ]

                ]);
            }
        },
        {
            hint     : 'Move to the right by 80: ***In a new line, type*** `move 160`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black',
                'circle 10',
                'move 160'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ]
                ]);
            }
        },
        {
            hint     : 'Choose a white color: ***In a new line, type*** `color white`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black',
                'circle 10',
                'move 160',
                'color white'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'color', { color: palette.white } ]
                ]);
            }
        },
        {
            hint     : 'Draw an ellipse: ***In a new line, type*** `ellipse 60, 40`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black',
                'circle 10',
                'move 160',
                'color white',
                'ellipse 60, 40'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ]
                ]);
            }
        },
        {
            hint     : 'Choose a black color: ***In a new line, type*** `color black`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black',
                'circle 10',
                'move 160',
                'color white',
                'ellipse 60, 40',
                'color black'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ]
                ]);
            }
        },
        {
            hint     : 'Draw an circle with a radius of 10: ***In a new line, type*** `circle 10`',
            solution : [
                'background black',
                'move -80',
                'color white',
                'ellipse 60, 40',
                'color black',
                'circle 10',
                'move 160',
                'color white',
                'ellipse 60, 40',
                'color black'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'background', { color: palette.black } ],
                    [ 'move-to', { dx: -80, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'color', { color: palette.white } ],
                    [ 'ellipse', { rx: 60, ry: 40 } ],
                    [ 'color', { color: palette.black } ],
                    [ 'ellipse', { rx: 10, isCircle: true } ]
                ]);
            }
        }
    ]
};
