"use strict";
var sdkFactory = require('kano-world-sdk');
var api, sdk;


function userProfile(config) {
    sdk = sdkFactory(config);
    api = sdk.api;

    api.add('getProfile', {
        method : 'get',
        route  : '/users/detail/:userId',
        params  : ['userId']
    });

    return api;
}

module.exports = userProfile;
