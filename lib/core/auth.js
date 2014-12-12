var api = require('../api');

var user = null;

module.exports = {
    init: function (callback) {
        api.auth.init(function (err, loggedUser) {
            if (loggedUser) {
                user = loggedUser;
            }

            if (callback) { callback(); }
        });
    },
    login: api.auth.login,
    logout: api.auth.logout,
    getState: function () {
        return !!user;
    },
    getUser: function () {
        return user;
    }
};