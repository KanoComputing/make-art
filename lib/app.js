/*
 * Angular app module
 *
 * Define behaviour for app `run` and `config`
 */

var challenges = require('./challenges/index'),
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
    $rootScope.challenges = challenges;
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
        api.progress.load(function (challengeNo) {
            $rootScope.progress.challengeNo = challengeNo || 1;
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
     * @param {Number} challengeNo
     * @return void
     */
    $rootScope.updateProgress = function (challengeNo) {
        if (challengeNo > $rootScope.progress.challengeNo) {

            api.progress.save(challengeNo, function(xpGain) {
                $rootScope.xpGain = xpGain;
                $rootScope.$apply();
            });

            $rootScope.progress.challengeNo = challengeNo;
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

    // Close menu on route change start
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.menuOpen = false;
    });

    // Close menu on route change success
    $rootScope.$on('$routeChangeSuccess', function (e, route) {
        $rootScope.basePath = route.$$route.originalPath.split('/')[1];
    });
});

module.exports = app;