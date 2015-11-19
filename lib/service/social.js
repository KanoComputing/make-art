"use strict";
var app = require('../app'),
    facebook = require('../core/facebook'),
    twitter = require('../core/twitter');

app.factory('socialService', function () {
    function init () {
        facebook.init();
        twitter.init();
    }

    return {
        init: init,
        facebook: facebook,
        twitter: twitter
    };
});