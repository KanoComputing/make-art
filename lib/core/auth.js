/*
 * Auth module
 *
 * Stateful module handling Kano World login and logout state
 */

/*
 * Auth module
 *
 * Stateful module handling Kano World login and logout state
 */

var api, user = null;

import apiFactory from '../api.js';

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

function auth (config) {
    api = apiFactory(config);

    /*
     * Initialise logged state
     *
     * @return void
     */
    function init(callback) {
        // Call async API method to checked if there's a logged in user
        api.auth.init(function (err, loggedUser) {
            if (loggedUser) { user = loggedUser; }
            if (callback) { callback(loggedUser); }
        });
    }

    return {
        init     : init,
        logout   : function (callback) {
            user = null;
            api.auth.logout(false);
            if (callback) { callback(); }
        },
        getState : getState,
        getUser  : getUser
    };
}

export default auth;
