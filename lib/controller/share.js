import app from '../app.js';

/*
 * Share Controller
 *
 * Loads a share item by its id throught the Kano API, then injects it in the
 * playground and redirects
 */

app.controller('ShareController', ['$scope', '$routeParams', '$location', '$rootScope', function ($scope, $routeParams, $location, $rootScope) {
    $scope.id = $routeParams.id || null;

    // Get share by id given in route
    $rootScope.api.share.getBySlug($scope.id)
        .then(function (res) {
            $scope.item = res;

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
}]);
