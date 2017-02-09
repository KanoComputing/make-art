/*
 * Main view controller
 *
 * Controller for main view - currently does nothing, but hey..
 */

var app = require('../app');

app.controller('MainController', ['$scope', '$rootScope', '$location',  function ($scope, $rootScope, $location) {
      var path = $location.path(),
          isRoot = path === '/' || path === '/challenges';
      if (isRoot) {
          $location.path('/challenges');
          $rootScope.splash.open();
      }
}]);
