import app from '../app.js';

/*
 * Playground view controller
 *
 * Controller for playground view
 */
app.controller('PlaygroundController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    // Set export dialogs
    $scope.exportDialogs = [ 'save', 'share' ];

    // Store playground code before closing
    window.onbeforeunload = storePlaygroundCode;

    // Load code from localStorage
    $scope.playground = {
        code : localStorage.playgroundCode || ''
    };

    if ($rootScope.loadedCode) {
        $scope.playground.code = $rootScope.loadedCode;
    }

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
}]);