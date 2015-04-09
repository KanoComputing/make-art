var palette = require('../language/modules/palette.json');

module.exports = {
    title       : 'Your first face',
    description : 'Draw a face',
    code        : '# Write the spell just below this line\n',
    startAt     : 2,
    steps       : [
        {
            hint     : 'Let’s get started! ***Type*** `circle 200`',
            solution : [
                'circle 200'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'ellipse', { rx: 200, isCircle: true } ]
                ]);
            }
        },
        {
            hint     : 'Let’s make it yellow! Add `color yellow` above the circle',
            solution : [
                'color yellow',
                'circle 200'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ]
                ]);
            }
        },
        {
            hint     : 'Nice! Above `color yellow` ***type*** `stroke 20, black`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200'
            ],
            validate  : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ]
                ]);
            }
        },
        {
            hint     : 'Cool! Now, below `circle 200`, **type** `move -80, -80`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200',
                'move -80, -80'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ],
                    [ 'move-to', { dx: -80, dy: -80 } ]
                ]);
            }
        },
        {
            hint     : 'In a new line, ***set the color*** to black: `color black`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200',
                'move -80, -80',
                'color black'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ],
                    [ 'move-to', { dx: -80, dy: -80 } ],
                    [ 'color', { color: palette.black} ]
                ]);
            }
        },
        {
            hint     : 'Now ***draw a circle*** with `circle 20`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200',
                'move -80, -80',
                'color black',
                'circle 20'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ],
                    [ 'move-to', { dx: -80, dy: -80 } ],
                    [ 'color', { color: palette.black} ],
                    [ 'ellipse', { rx: 20, isCircle: true } ]
                ]);
            }
        },
        {
            hint     : 'Nice one! Now ***type*** `move 160` and ***draw another circle*** with `circle 20`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200',
                'move -80, -80',
                'color black',
                'circle 20',
                'move 160',
                'circle 20',
                'move 160',
                'circle 20'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ],
                    [ 'move-to', { dx: -80, dy: -80 } ],
                    [ 'color', { color: palette.black} ],
                    [ 'ellipse', { rx: 20, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'ellipse', { rx: 20, isCircle: true } ]
                ]);
            }
        },
        {
            hint     : 'Cool! Now ***add*** `moveTo 235, 270`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200',
                'move -80, -80',
                'color black',
                'circle 20',
                'move 160',
                'circle 20',
                'move 160',
                'circle 20',
                'moveTo 235, 270'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ],
                    [ 'move-to', { dx: -80, dy: -80 } ],
                    [ 'color', { color: palette.black} ],
                    [ 'ellipse', { rx: 20, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'ellipse', { rx: 20, isCircle: true } ],
                    [ 'move-to', { x: 235, y: 270 } ]
                ]);
            }
        },
        {
            hint     : 'To finish up ***type*** `arc 100, 1, 2`',
            solution : [
                'stroke 20, black',
                'color yellow',
                'circle 200',
                'move -80, -80',
                'color black',
                'circle 20',
                'move 160',
                'circle 20',
                'move 160',
                'circle 20',
                'moveTo 235, 270',
                'arc 100, 1, 2'
            ],
            validate : function () {
                return this.isSequence([
                    [ 'stroke-color', { color: palette.black } ],
                    [ 'stroke-width', { width: 20 } ],
                    [ 'color', { color: palette.yellow } ],
                    [ 'ellipse', { rx: 200, isCircle: true } ],
                    [ 'move-to', { dx: -80, dy: -80 } ],
                    [ 'color', { color: palette.black} ],
                    [ 'ellipse', { rx: 20, isCircle: true } ],
                    [ 'move-to', { dx: 160, dy: 0 } ],
                    [ 'ellipse', { rx: 20, isCircle: true } ],
                    [ 'move-to', { x: 235, y: 270 } ],
                    [ 'arc', { radius: 100, start: 1, end: 2 } ]
                ]);
            }
        }
    ]
};
