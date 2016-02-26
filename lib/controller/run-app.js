/*
 * Playground view controller
 *
 * Controller for playground view
 */

var app = require('../app');

app.controller('RunAppController', function ($scope, $routeParams, $http, $location, $rootScope) {
    $rootScope.appMode = true;

    var api = $rootScope.api;

    $scope.id = $routeParams.id || null;
    console.log($scope.id);
    console.log(api);

    $http.get(window.CONFIG.API_URL + '/share/' + $scope.id)
    .success(function (res) {
        console.log(res);
        $scope.item = res.item;
        console.log($scope.item.attachment_url);
        $http.get($scope.item.attachment_url)
        .success(function (res) {
            $scope.appCode = res;
            console.log(res);
        })
        .error(function (message) {
            $scope.showError(message);
        });
    })
    .error(function (message) {
        $scope.showError(message);
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


    // Set export dialogs
    $scope.exportDialogs = [ 'save', 'share' ];

    // Store playground code before closing
    window.onbeforeunload = storePlaygroundCode;

    // Load code from localStorage
    $scope.playground = {
        code : localStorage.playgroundCode || ''
    };

    /*
     * Save current playground code in localStorage (Or remove if empty)
     *
     * @return void
     */
    function storePlaygroundCode() {
        if (!$scope.playground.code || !$scope.playground) {
            localStorage.removeItem('playgroundCode');
        } else {
            localStorage.playgroundCode = $scope.playground.code;
        }
    }
});
