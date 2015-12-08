"use strict";
var app = require('../app'),
    facebook = require('../core/facebook'),
    twitter = require('../core/twitter');

app.factory('socialService', function ($rootScope) {
    function init() {
        facebook.init();
        twitter.init();
    }

    function buildURL(creation) {
        var text;
        if (creation) {
            text = "For #" + creation.world.replace(/ /g, '') + " with @TeamKano I created " + creation.title + " on Make Art.\n" + creation.url;
        } else {
            text = $rootScope.selectedWorld.socialText.twitter;
        }
        return encodeURI("https://twitter.com/intent/tweet?text=" + text).replace(/#/g, '%23');
    }

    twitter.build = buildURL;

    return {
        init: init,
        facebook: facebook,
        twitter: twitter
    };
});
