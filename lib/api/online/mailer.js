"use strict";

function mailer(config) {
    var api = require('kano-world-sdk')(config).api;

    api.add('mailer', {
        method : 'post',
        route  : '/mail'
    });

    return api.mailer;
}

module.exports = mailer;
