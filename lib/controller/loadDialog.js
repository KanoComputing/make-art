/*
 * LoadDialog controller
 *
 * Controller for item loading dialog
 */

import app from '../app';

/*
 * LoadDialog controller
 *
 * Controller for item loading dialog
 */

var api;

app.controller('LoadDialogController', function ($scope, $window, $rootScope) {
    api = $rootScope.api;

    var win = angular.element($window);

    $scope.isOpen = false;

    /*
     * Show loading dialog
     *
     * @return void
     */
    $scope.openDialog = function () {
        $scope.isOpen = true;
    };

    /*
     * Inject loaded data and hide dialog
     *
     * @param {String} data
     * @return void
     */
    function injectData(data) {
        $scope.playground.code = data;
        $scope.isOpen = false;
        $scope.$apply();
    }

    /*
     * Load data locally from file input
     *
     * @param {HTMLInput} fileinput
     * @return void
     */
    function loadLocal(fileinput) {
        var file = fileinput.files[0],
            reader = new FileReader();

        reader.onload = function(evt) {
            var fileData = evt.target.result;

            $scope.load.inject(fileData);
        };

        reader.readAsText(file);
    }

    /*
     * Load item from web API
     *
     * @param {HTMLInput} fileinput
     * @return void
     */
    function loadWeb() {
        api.challengeIO.web.load(function(challenge) {
            $scope.load.inject(challenge);
        });
    }

    // Attach loading methods to scope 
    $scope.load = {
        inject : injectData,
        local  : loadLocal,
        web    : loadWeb
    };

    // Listen for key press
    win.bind('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            $scope.isOpen = false;
            $scope.$apply();
        }
    });
});