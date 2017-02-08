/*
 * Main view controller
 *
 * Controller for main view - currently does nothing, but hey..
 */

var app = require('../app');

app.controller('MainController', ['$scope', '$rootScope', '$location',  function ($scope, $rootScope, $location) {
    $rootScope.isSplashOpen = $location.path() === '/';
    console.log($rootScope.isSplashOpen);
    $location.path('/challenges');
}]);
