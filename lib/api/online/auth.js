var sdk,
    analytics = require('../../core/analytics');

/*
 * Initialise Kano World SDK with auth
 *
 * @param {Function} callback
 * @return void
 */

module.exports = function (config) {
    sdk = require('kano-world-sdk')(config);

    return {
        init : function (callback) {
            sdk.init(function(err, user) {
                if (!err) {
                    analytics.identify(user);
                }

                callback(err, user);
            });
        },
        login : sdk.auth.login,
        logout: sdk.auth.logout
    };
};