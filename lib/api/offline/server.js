import api from './local-api.js';
import notify from '../notify.js';
console.log('server.js offline => 1')
var shutdown = function() {
    api.server.shutdown({})
    .then(function(){}, notify.failure);
};

export default {
    shutdown : shutdown,
};
