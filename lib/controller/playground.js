/*
 * Playground view controller
 *
 * Controller for playground view
 */

var app = require('../app');

app.controller('PlaygroundController', function ($scope) {
    // Set export dialogs
    $scope.exportDialogs = [ 'save', 'share' ];

    // Load code from localStorage
    $scope.playground = {
        code : localStorage.playgroundCode || ''
    };
});
