/*
 * Splash Screen Controller
 *
 * Opens up when on main route
 */

var app = require('../app');

app.controller('SplashController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.isSplashOpen = $rootScope.isSplashOpen;
}]);
