/*
 * Angular app module
 *
 * Define behaviour for app `run` and `config`
 */

var levels = require('./levels/index'),
    api = require('./api'),
    config = require('./core/config'),
    auth = require('./core/auth');

// Define app module object
var app = angular.module('draw', [ 'ngRoute' ]);

// Configure app
app.config(function ($locationProvider) {

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(true);
    }

});

// Run app
app.run(function ($rootScope, $window) {
    var win = angular.element($window);

    // Define global app initial values
    $rootScope.levels = levels;
    $rootScope.menuOpen = false;
    $rootScope.progress = {};
    $rootScope.offline = config.OFFLINE;
    $rootScope.loggedIn = false;
    $rootScope.user = null;
    $rootScope.login = auth.login;
    $rootScope.logout = auth.logout;
    $rootScope.shutdown = api.server.shutdown;

    // Initialised auth state
    auth.init(function () {
        $rootScope.loggedIn = auth.getState();
        $rootScope.user = auth.getUser();

        // Load progress
        api.progress.load(function (level) {
            $rootScope.progress.challengeNo = level || 1;
            $rootScope.$apply();
        });
    });

    // Challenge menu toggle methods
    $rootScope.challengeMenu = {
        open : function () {
            $rootScope.menuOpen = true;
        },
        close : function () {
            $rootScope.menuOpen = false;
        },
        toggle: function () {
            $rootScope.menuOpen = !$rootScope.menuOpen;
        }
    };

    /*
     * Get last visited challenge index
     *
     * @return {Number}
     */
    function getLastChallenge() {
        return parseInt(localStorage.lastChallengeVisited || 1, 10);
    }

    /*
     * Set last visited challenge index
     *
     * @param {Number} index
     * @return void
     */
    function setLastChallenge(index) {
        localStorage.lastChallengeVisited = index;
    }

    /*
     * Attach lastChallengeVisited get / set object to $rootScope
     */
    $rootScope.lastChallengeVisited = {
        get : getLastChallenge,
        set : setLastChallenge
    };

    /*
     * Update progress
     *
     * @param {Number} level
     * @return void
     */
    $rootScope.updateProgress = function (level) {
        if (level > $rootScope.progress.challengeNo) {

            api.progress.save(level, function(xpGain) {
                $rootScope.xpGain = xpGain;
                $rootScope.$apply();
            });

            $rootScope.progress.challengeNo = level;
            $rootScope.$apply();

        } else {

            $rootScope.xpGain = 0;
            $rootScope.$apply();

        }
    };

    // Listen for key press
    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $rootScope.menuOpen = false;
            $rootScope.$apply();
        }
    });

    // Close menu on route change
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.menuOpen = false;
    });
});

module.exports = app;