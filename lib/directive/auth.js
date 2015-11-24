"use strict";
var app = require('../app');

/*
 * Auth directive
 *
 * Diplay alogin/signup form an authenticate the user
 */
app.directive('authForm', function () {
    return {
        restrict    : 'E',
        templateUrl : '/directive/auth.html',
        scope       : {
            mode: '='
        },
        controller: 'AuthController'
    };
});
