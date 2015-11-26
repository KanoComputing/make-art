"use strict";
/*
 * Facebook module
 */

/*
 * Share content with given options on Facebook
 *
 * @param {Object} options
 * @param {Function} callback
 */
function share(options, callback) {
    window.FB.ui({
        method      : 'feed',
        name        : options.title || 'Kano World',
        link        : resolveUrl(options.url),
        picture     : resolveUrl(options.picture),
        description : options.caption || '-',
        caption     : options.text || '-',
        message     : options.text || '-'
    }, function (res) {
        if (res && res.post_id) {
            callback(null, res);
        }

        return callback(res, !res ? null : null);
    });
}

/*
 * Add http protocol to URL if missing
 *
 * @param {String} url
 * @return {String}
 */
function resolveUrl(url) {
    var baseUrl = location.protocol + '//' + location.host;

    return url && url.indexOf('://') === -1 ? baseUrl + url : url;
}

/*
 * Initialise module
 */
function init() {
    initFacebook();
}

/*
 * Initialise Facebook SDK - This is a slightly more readable and contained
 * version of the horrible script API provides you to initialise their SDK -
 * I really didn't wanna pollute the main HTML file with this stuff..
 */
function initFacebook() {
    var facebookRoot = document.createElement('div'),
        appId = window.CONFIG.FACEBOOK_APP_ID;

    facebookRoot.setAttribute('id', 'fb-root');
    document.body.appendChild(facebookRoot);


    window.fbAsyncInit = function () {
        window.FB.init({
            appId   : appId,
            xfbml   : true,
            version : 'v2.4'
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

module.exports = {
    init  : init,
    share : share
};
