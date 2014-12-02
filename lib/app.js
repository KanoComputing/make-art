var app = angular.module('draw', [ 'ngRoute' ]),
    levels = require('./levels/index'),
    progress = require('./api/progress');

app.config(function ($locationProvider) {

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(true);
    }

});

app.run(function ($rootScope, $window) {
    var win = angular.element($window);

    $rootScope.levels = levels;
    $rootScope.menuOpen = false;

    $rootScope.lastChallengeVisited = {
        get : function() {
            var level = localStorage.lastChallengeVisited;

            if (typeof level === 'undefined'
                || level === null) {

                $rootScope.lastChallengeVisited.set(1);

                return 1;
            }

            return Number(level);
        },
        set : function(challengeNo) {
            localStorage.lastChallengeVisited = challengeNo;
        }
    };

    $rootScope.progress = {
        load : function() {
            progress.load(function(_progress) {
                $rootScope.progress.challengeNo = _progress;
            });
        },
        save : progress.save,
        update : function(_progress) {
            if (_progress > $rootScope.progress.challengeNo) {
                progress.save(_progress, function(_xpGain) {
                    $rootScope.xpGain = _xpGain;
                    $rootScope.$apply();
                });
                $rootScope.progress.challengeNo = _progress;
                $rootScope.$apply();
            }
        }
    };

    $rootScope.progress.load();

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
