var sdk = require('kano-world-sdk'),
    analytics = require('../../core/analytics');

/*
 * Initialise Kano World SDK with auth
 *
 * @param {Function} callback
 * @return void
 */
function init(callback) {
    sdk.init(function(err, user) {
        if (!err) {
            analytics.identify(user);
        }

        callback(err, user);
    });
}

module.exports = {
    init   : init,
    login  : sdk.auth.login,
    logout : sdk.auth.logout
};
