var levels = require('../levels/index');

/*
 * Levels Controller
 *
 * Controller for levels selection screen
 */

var app = require('../app');

app.controller('LevelsController', function ($scope) {
    $scope.levels = levels;
});