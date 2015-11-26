"use strict";
var app = require('../app');

app.factory('emailService', function ($http, $rootScope) {
    function resetFields(item) {
        item.email = '';
    }

    function buildEmailObject(item) {
        return {
            name            : item.username,
            message         : item.description,
            title           : item.title,
            world_url       : item.url,
            cover_url       : item.cover_url,
            user_email      : item.user_email,
            email           : item.email
        };
    }

    function emailer(item, successCB, errorCB) {
        var host = $rootScope.cfg.MAILSERVER,
            req = {
                method  : 'POST',
                url     : host,
                headers : {
                    'Content-Type': 'application/json'
                },
                data    : JSON.stringify(item)
            };

        $http(req).then(successCB, errorCB);
    }

    function validateEmail(email) {
        var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regExp.test(email);
    }

    return {
        reset       : resetFields,
        buildObject : buildEmailObject,
        send        : emailer,
        validate    : validateEmail
    };
});
