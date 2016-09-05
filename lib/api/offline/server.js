var api = require('./local-api'),
    notify = require('../notify');

var shutdown = function() {
    api.server.shutdown({})
    .then(function(){}, notify.failure);
};

module.exports = {
    shutdown : shutdown,
};
