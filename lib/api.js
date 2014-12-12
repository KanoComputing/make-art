var config = require('./core/config'),
    offline = require('./api/offline/index'),
    online = require('./api/online/index');

module.exports = config.OFFLINE ? offline : online;