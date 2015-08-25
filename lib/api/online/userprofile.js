var sdk = require('kano-world-sdk').api;

sdk.add('getProfile', {
    method : 'get',
    route  : '/users/detail/:userId',
    params  : ['userId']
});

module.exports = sdk;