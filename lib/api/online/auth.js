var sdk = require('kano-world-sdk');

/*
 * Initialise Kano World SDK with auth
 *
 * @param {Function} callback
 * @return void
 */
function init(callback) {
    sdk.init(callback);
}

module.exports = {
    init   : init,
    login  : sdk.auth.login,
    logout : sdk.auth.logout
};