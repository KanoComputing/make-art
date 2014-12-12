var sdk = require('kano-world-sdk');

module.exports = {
    init   : function (callback) {
        sdk.init(callback);
    },
    login  : sdk.auth.login,
    logout : sdk.auth.logout
};