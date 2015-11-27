var sdk,
    analytics = require('../../core/analytics');

/*
 * Initialise Kano World SDK with auth
 *
 * @param {Function} callback
 * @return void
 */

function auth(config) {
    sdk = require('kano-world-sdk')(config);

    return {
        init : function (callback) {
            var token = sdk.auth.getToken();
            if (token) {
                sdk.auth.login(token);
            }
            sdk.registerForms();
            sdk.auth.initSession(callback);
        },
        login : sdk.auth.login,
        logout: sdk.auth.logout
    };
}

module.exports = auth;
