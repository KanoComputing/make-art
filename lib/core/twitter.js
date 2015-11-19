function init () {
    window.twttr = (function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};

        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));
}

function share (callback) {
    twttr.ready(function (twttr) {
        twttr.events.bind('tweet', function (e) {
            if (!e) { return; }
            
            callback(e);
        });
    });
}

function buildURL (creation) {
    var text = creation.title + " by " + creation.username + " through " + creation.world + " on Make Art.\n" + creation.url;

    return "https://twitter.com/intent/tweet?text=" + encodeURI(text);
};

module.exports = {
    init: init,
    share: share,
    build: buildURL
};