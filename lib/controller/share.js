/*
 * Share Controller
 *
 * Loads a share item by its id throught the Kano API, then injects it in the
 * playground and redirects
 */

import app from '../app.js';

/*
 * Share Controller
 *
 * Loads a share item by its id throught the Kano API, then injects it in the
 * playground and redirects
 */

var api;

app.controller('ShareController', function ($scope, $routeParams, $location, $rootScope) {
    api = $rootScope.api;

    $scope.id = $routeParams.id || null;

    // Get share by id given in route
    api.online.share.getBySlug($scope.id)
    .then(function (res) {

        $scope.item = res.body.item;

        if ($scope.item.app !== 'kano-draw') {
            return $scope.showError('Not a Kano Draw share');
        }

        fetch($scope.item.attachment_url)
            .then(r => r.text())
            .then((res) => {
                localStorage.playgroundCode = res;
                $scope.$apply(function () {
                    $location.path('/playground');
                });
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
