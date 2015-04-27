/*
 * Splash Screen Controller
 *
 * Opens up when on main route
 */

var app = require('../app');

app.controller('SplashController', function ($scope, $location) {
    $scope.isSplashOpen = $location.path() === '/';
});