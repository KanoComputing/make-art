var app = require('../app');

/*
 * Splash Screen Controller
 * Opens up when on main route
 */
app.controller('SplashController', function ($scope, $location) {
    $scope.isSplashOpen = $location.path() === '/';
});