import api from './local-api';
import notify from '../notify';

var shutdown = function() {
    api.server.shutdown({})
    .then(function(){}, notify.failure);
};

export default {
    shutdown : shutdown,
};
