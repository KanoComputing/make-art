"use strict";

var sdkFactory = require('kano-world-sdk');

function mailer(config) {
    var api = sdkFactory(config).api;

    api.add('mailer', {
        method : 'post',
        route  : '/mail'
    });

    return api.mailer;
}

module.exports = mailer;
