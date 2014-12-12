var app = angular.module('draw', [ 'ngRoute' ]),
    levels = require('./levels/index'),
    api = require('./api'),
    config = require('./core/config'),
    auth = require('./core/auth');

app.config(function ($locationProvider) {

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(true);
    }

});

app.run(function ($rootScope, $window) {
    var win = angular.element($window);

    $rootScope.levels = levels;
    $rootScope.menuOpen = false;
    $rootScope.isSplashOpen = true;
    $rootScope.progress = {};
    $rootScope.offline = config.OFFLINE;
    $rootScope.loggedIn = false;
    $rootScope.user = null;
    $rootScope.login = auth.login;
    $rootScope.logout = auth.logout;
    $rootScope.shutdown = api.server.shutdown;

    auth.init(function () {
        $rootScope.loggedIn = auth.getState();
        $rootScope.user = auth.getUser();

        api.progress.load(function (level) {
            $rootScope.progress.challengeNo = level;
        });
    });

    $rootScope.lastChallengeVisited = {
        get : function() {
            var level = localStorage.lastChallengeVisited;

            if (typeof level === 'undefined' ||
                level === null) {

                $rootScope.lastChallengeVisited.set(1);

                return 1;
            }

            return Number(level);
        },
        set : function(challengeNo) {
            localStorage.lastChallengeVisited = challengeNo;
        }
    };

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

    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $rootScope.menuOpen = false;
            $rootScope.$apply();
        }
    });

    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.menuOpen = false;
    });
});

module.exports = app;
