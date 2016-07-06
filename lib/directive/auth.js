"use strict";
var i18n = require('../i18n'),
    app = require('../app');

/*
 * Auth directive
 *
 * Diplay alogin/signup form an authenticate the user
 */
app.directive('authForm', function () {
    return {
        restrict    : 'E',
        templateUrl : i18n.getHtmlLocalePath() + '/directive/auth.html',
        scope       : {
            mode: '='
        },
        controller: 'AuthController'
    };
});
