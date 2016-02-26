/*
 * Playground view controller
 *
 * Controller for playground view
 */

var app = require('../app');

app.controller('RunAppController', function ($scope, $routeParams, $http, $rootScope) {
    $rootScope.appMode = true;
    $rootScope.iframe = true;

    var api = $rootScope.api;

    $scope.mode = 'run-app';
    if ($routeParams.iframe === 'true') {
        $scope.mode = 'run-app-iframe';
    }

    $scope.id = $routeParams.id || null;
    $scope.shareId = $routeParams.id || null;
    console.log($scope.id);

    $http.get(window.CONFIG.API_URL + '/share/' + $scope.id)
    .success(function (res) {
        $scope.item = res.item;
        $http.get($scope.item.attachment_url)
        .success(function (res) {
            $scope.appCode = res;
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
