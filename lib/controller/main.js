/*
 * Main view controller
 *
 * Controller for main view - currently does nothing, but hey..
 */

var app = require('../app');

app.controller('MainController', ['$scope', '$rootScope', '$location',  function ($scope, $rootScope, $location) {
    $rootScope.splashDisplayed = false;
    $rootScope.isSplashOpen = $location.$$path === '/' && !$rootScope.splashDisplayed;
    $location.path('/challenges');
    $rootScope.$on('splash-closed', function () {
        $rootScope.splashDisplayed = true;
    });
}]);
