var express = require('express'),
    color = require('cli-color'),
    logger = require('./logger');

var app = express(),
    port = process.env.PORT || 3000;

app.use(logger);

app.use(express.static('./www'));

app.use(function (req, res, next) {
    if (req.url.indexOf('.') === -1) {
        res.sendfile('./www/index.html');
    } else {
        next();
    }
});

app.listen(port);
console.log(color.green('Listening on port ' + port + '...'));