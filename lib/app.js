var app = angular.module('draw', [ 'ngRoute' ]),
    levels = require('./levels/index');

app.config(function ($locationProvider) {

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(true);
    }

});

app.run(function ($rootScope, $window) {
    var win = angular.element($window);

    $rootScope.levels = levels;
    $rootScope.menuOpen = false;

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