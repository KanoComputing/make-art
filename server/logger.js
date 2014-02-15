var color = require('cli-color');

var methodColors = {
    post: color.cyan,
    get: color.blue,
    put: color.magenta,
    delete: color.red
};

function outputMethod (method) {
    var colorFn = methodColors[method.toLowerCase()] || color.white;
    return colorFn('[' + method.toUpperCase() + ']');
}

function outputStatus (code) {
    var colorFn = code === 200 ? color.green : color.red;
    return colorFn('[' + code + ']');
}

module.exports = function (req, res, next) {

    res.on('header', function () {
        console.log(
            outputStatus(res.statusCode) +
            outputMethod(req.method) +
            ' - ' +
            color.yellow(req.url)
        );
    });

    next();

};