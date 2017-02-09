/*
 * Splash Screen Controller
 *
 * Opens up when on main route
 */

var app = require('../app');

app.controller('SplashController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
    var path = $location.path(),
        isRoot = path === '/' || path === '/challenges';
    if (isRoot) {
        $rootScope.splash.open();
    } else {
        $rootScope.splash.close();
    }
}]);
