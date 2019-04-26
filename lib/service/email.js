"use strict";
import app from '../app';

app.factory('emailService', function ($rootScope) {
    function resetFields(item) {
        item.email = '';
    }

    function buildEmailObject(item) {
        return {
            type            : item.type,
            options         : {
                from_name   : item.username,
                from_email  : item.user_email,
                to_name     : item.to_name || null,
                to_email    : item.email,
                message     : item.description || null,
                title       : item.title || null,
                url         : item.url || null,
                cover_url   : item.cover_url || null
            }
        };
    }

    function emailer(item, successCB, errorCB) {
        $rootScope.api.mailer(item)
        .then(successCB, errorCB);
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
