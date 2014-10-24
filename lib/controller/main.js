var app = require('../app'),
    examples = require('../../content/examples/index');

app.controller('main', function ($scope) {
    $scope.examples = examples;

    $scope.selectExample = function (i) {
        $scope.current = i;
        $scope.code = examples[i].code;
    };

    $scope.selectExample(0);
});