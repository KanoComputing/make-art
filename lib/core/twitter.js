"use strict";
function init() {
    window.twttr = (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};

        if (d.getElementById(id)) {
            return t;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
}

function share(callback) {
    window.twttr.ready(function (twttr) {
        twttr.events.bind('tweet', function (res) {
            if (!res) {
                return;
            }
            callback(res);
        });
    });
}

function buildURL(creation) {
    var text;
    if (creation) {
        text = "For #" + creation.world.replace(/ /g, '') + " with @TeamKano I created " + creation.title + " on Make Art.\n" + creation.url;
    } else {
        text = "Hack your way through video game history with #PixelHack from @TeamKano!\nhttp://art.kano.me/challenges/pixelhack/";
    }
    return encodeURI("https://twitter.com/intent/tweet?text=" + text).replace(/#/g, '%23');
}

module.exports = {
    init: init,
    share: share,
    build: buildURL
};
