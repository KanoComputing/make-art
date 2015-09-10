/*
 * Auth module
 *
 * Stateful module handling Kano World login and logout state
 */

var api,
    user = null;

/*
 * Get user object if logged in
 *
 * @return {Object|void}
 */
function getUser() {
    return user;
}

/*
 * Get logged in state
 *
 * @return {Boolean}
 */
function getState() {
    return !!getUser();
}

module.exports = function (config) {
    api = require('../api')(config);

    /*
     * Initialise logged state
     *
     * @return void
     */
    function init(callback) {
        // Call async API method to checked if there's a logged in user
        api.auth.init(function (err, loggedUser) {
            if (loggedUser) { user = loggedUser; }
            if (callback) { callback(); }
        });
    }

    return {
        init     : init,
        login    : api.auth.login,
        logout   : api.auth.logout,
        getState : getState,
        getUser  : getUser
    };
};