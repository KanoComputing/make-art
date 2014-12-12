var express = require('express'),
    color = require('cli-color'),
    logger = require('./logger'),
    path = require('path');

var app = express(),
    port = process.env.PORT || 3000;

app.use(logger);

app.use(express.static('./www'));

app.use(function (req, res, next) {
    if (!/\.([a-zA-Z]{2,4})$/.test(req.url)) {
        res.sendFile(path.resolve('./www/index.html'));
    } else {
        next();
    }
});

app.listen(port);
console.log(color.green('Listening on port ' + port + '...'));