import api from './local-api.js';
import notify from '../notify.js';

var shutdown = function() {
    api.server.shutdown({})
    .then(function(){}, notify.failure);
};

export default {
    shutdown : shutdown,
};
