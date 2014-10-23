var session = require('./session');

var CURSOR_SIZE = 10,
    CURSOR_WEIGHT = 1;

function startShape() {
    session.ctx.beginPath();
}

function endShape() {
    session.ctx.closePath();
    session.ctx.fill();
    session.ctx.stroke();
}

function parseLineStyle(attributes) {
    var out = {},
        i, attr;

    for (i = 0 ; i < attributes.length; i += 1) {
        attr = attributes[i];

        if (typeof attr === 'number') {
            out.width = attr;
        } else {
            out.color = attr;
        }
    }

    return out;
}

function parseCoordinate(val, type) {
    type = type || 'x';

    if (typeof val === 'string') {
        if (type === 'x') {
            switch (val) {
                case 'center':
                    return getCenter().x;
                case 'right':
                    return session.width;
                case 'left':
                    return 0;
            }
        } else if (type === 'y') {
            switch (val) {
                case 'center':
                    return getCenter().y;
                case 'bottom':
                    return session.height;
                case 'top':
                    return 0;
            }
        }
    }

    return val;
}

function parseCoordinates(x, y) {
    x = parseCoordinate(x, 'x');
    y = parseCoordinate(y, 'y');

    return { x: x, y: y };
}

function drawCursor(pos, color) {
    color = color || 'rgba(0, 0, 0, .4)';

    var ratio = session.ratio;

    session.ctx.strokeStyle = color;
    session.ctx.lineWidth = CURSOR_WEIGHT * ratio;

    startShape();
    session.ctx.moveTo((pos.x - CURSOR_SIZE / 2) * ratio, pos.y * ratio);
    session.ctx.lineTo((pos.x + CURSOR_SIZE / 2) * ratio, pos.y * ratio);
    session.ctx.moveTo(pos.x * ratio, (pos.y - CURSOR_SIZE / 2) * ratio);
    session.ctx.lineTo(pos.x * ratio, (pos.y + CURSOR_SIZE / 2) * ratio);
    endShape();
    session.ctx.strokeStyle = session.settings.stroke.color;
    session.ctx.lineWidth = session.settings.stroke.width * ratio;
    session.ctx.moveTo(pos.x, pos.y);
}

function getCenter() {
    return {
        x : session.width / 2,
        y : session.height / 2
    };
}

module.exports = {
    startShape       : startShape,
    endShape         : endShape,
    parseLineStyle   : parseLineStyle,
    parseCoordinate  : parseCoordinate,
    parseCoordinates : parseCoordinates,
    drawCursor       : drawCursor,
    getCenter        : getCenter
};