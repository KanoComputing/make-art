var app = require('../app'),
    examples = require('../../content/examples/index');

/*
 * Examples Controller
 * Controller for examples section
 */
app.controller('ExamplesController', function($scope) {
    $scope.examples = examples;

    /*
     * Select an example by index
     * @param {Number} index
     * @return void
     */
    $scope.selectExample = function (index) {
        $scope.current = index;
        $scope.code = examples[index].code;
    };

    $scope.selectExample(0);
});