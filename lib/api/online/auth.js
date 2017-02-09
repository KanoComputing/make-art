var sdk;

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
            sdk.registerForms();
            sdk.auth.initSession(callback);
        },
        login : function (token, callback) {
            sdk.auth.setToken(token);
            sdk.auth.initSession(callback);
        },
        saveLogin : function (token, callback) {
            sdk.auth.setToken(token);
            if (callback) {
                callback();
            }
        },
        logout: function (reload) {
            sdk.auth.logout(reload);
        }
    };
}

module.exports = auth;
