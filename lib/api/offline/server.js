var api = require('./local-api'),
    notify = require('../notify');

var shutdown = function() {
    api.server.shutdown({})
    .then(notify.success, notify.failure);
};

module.exports = {
    shutdown : shutdown,
};
