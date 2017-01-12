/*
 * Share Controller
 *
 * Loads a share item by its id throught the Kano API, then injects it in the
 * playground and redirects
 */

var app = require('../app'),
    api;

app.controller('ShareController', function ($scope, $routeParams, $http, $location, $rootScope) {
    api = $rootScope.api;

    $scope.id = $routeParams.id || null;

    // Get share by id given in route
    api.online.share.get.byId({ id: $scope.id })
    .then(function (res) {

        $scope.item = res.body.item;

        if ($scope.item.app !== 'kano-draw') {
            return $scope.showError('Not a Kano Draw share');
        }

        $http.get($scope.item.attachment_url)
        .success(function (res) {

            localStorage.playgroundCode = res;
            $location.path('/playground');

        })
        .error(function (message) {
            $scope.showError(message);
        });

    }, function (res) {
        $scope.showError(res.body);
    })
    .catch(function (err) {
        throw err;
    });

    /*
     * Show error message
     *
     * @param {String} message
     * @return void
     */
    $scope.showError = function (message) {
        // Next tick..
        setTimeout(function () {
            $scope.error = message;
            $scope.$apply();
        }, 1);
    };
});
