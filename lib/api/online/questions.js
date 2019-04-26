"use strict";

var sdkFactory = require('kano-world-sdk');

function questions(config) {
    var api = sdkFactory(config).api;

    api.add('questions.create', {
        method : 'post',
        route  : '/questions'
    });

    api.add('questions.list', {
        method : 'get',
        route  : '/questions'
    });

    api.add('questions.respond', {
        method : 'post',
        route  : '/questions/responses',
        params : ['username', 'email', 'answers']
    });

    return api.questions;
}

module.exports = questions;
