/*
 * Auth module
 *
 * Stateful module handling Kano World login and logout state
 */

var api,
    user = null,
    tracking = require('./tracking');

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
            if (callback) { callback(loggedUser); }
        });
    }

    return {
        init     : init,
        login    : function (session, callback) {
            user = session.user;
            tracking.dispatchTrackingEvent('loggedInToKanoWorld');
            tracking.trackVisitType('Logged in');
            api.auth.saveLogin(session.token, function () {
                if (callback) { callback(user); }
            });
        },
        logout   : function (callback) {
            user = null;
            api.auth.logout(false);
            tracking.dispatchTrackingEvent('loggedOutOfKanoWorld');
            tracking.trackVisitType('Logged out');
            if (callback) { callback(); }
        },
        getState : getState,
        getUser  : getUser
    };
}

module.exports = auth;
