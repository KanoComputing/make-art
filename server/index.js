var express = require('express'),
    color = require('cli-color');

var app = express(),
    port = process.env.PORT || 3000;

app.use(express.static('./www'));

app.use(function(req, res) {
  res.sendfile('./www/index.html');
});

app.listen(port);
console.log(color.green('Listening on port ' + port + '...'));