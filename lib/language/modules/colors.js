var Color = require('color');

function dark(color) {
    return Color(color).dark();
}

function light(color) {
    return Color(color).light();
}

function darken(color, amt) {
    return brightness(color, brightness(color) - amt);
}

function lighten(color, amt) {
    return brightness(color, brightness(color) + amt);
}

function brightness(color, amt) {
    return getOrSet('hsl', 2, color, amt);
}

function mix(a, b, amt) {
    amt = amt || 50;
    return Color(a).mix(Color(b), amt / 100).rgbaString();
}

function saturate(color, amt) {
    return saturation(color, saturation(color) + amt);
}

function desaturate(color, amt) {
    return saturation(color, saturation(color) - amt);
}

function saturation(color, amt) {
    return getOrSet('hsl', 1, color, amt);
}

function rotate(color, amt) {
    return Color(color).rotate(amt).rgbaString();
}

function hue(color, amt) {
    return getOrSet('hsl', 0, color, amt);
}

function transparent(color, amt) {
    return getOrSet(null, 'alpha', color, amt);
}

function opacize(color, amt) {
    return transparent(color, transparent(color) + amt);
}

function transparentize(color, amt) {
    return transparent(color, transparent(color) + amt);
}

function getOrSet(mode, key, color, amt) {
    color = Color(color);

    if (typeof amt === 'undefined') {
        return mode ? color.values[mode][key] : color.values[key];
    }

    if (key === 'alpha') {
        return color.alpha(amt).rgbaString();
    }

    var values = color.values[mode];

    values[key] = amt;

    return Color().hsl(values).rgbaString();
}

module.exports = {
    dark           : dark,
    light          : light,
    lighten        : lighten,
    darken         : darken,
    brightness     : brightness,
    mix            : mix,
    saturation     : saturation,
    saturate       : saturate,
    desaturate     : desaturate,
    hue            : hue,
    rotate         : rotate,
    transparent    : transparent,
    opacize        : opacize,
    transparentize : transparentize
};