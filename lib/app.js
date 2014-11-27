var app = angular.module('draw', [ 'ngRoute' ]),
    levels = require('./levels/index'),
    progress = require('./api/progress'),
    challengeIO = require('./api/challenge-io');

app.config(function ($locationProvider) {

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(true);
    }

});

app.run(function ($rootScope, $window) {
    var win = angular.element($window);

    $rootScope.levels = levels;
    $rootScope.menuOpen = false;

    $rootScope.progress = {
        load : function() {
            progress.load(function(_progress) {
                $rootScope.progress.challengeNo = _progress;
            });
        },
        save : progress.save,
        update : function(_progress) {
            if (_progress > $rootScope.progress.challengeNo) {
                progress.save(_progress);
                $rootScope.progress.challengeNo = _progress;
                $rootScope.$apply();
            }
        }
    };

    $rootScope.challengeIO = {
        save : challengeIO.save,
        share : challengeIO.share
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