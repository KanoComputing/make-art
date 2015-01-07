var app = require('../app'),
    examples = require('../../content/examples/index');

app.controller('MainController', function ($scope, $rootScope) {
    $scope.examples = examples;
    $rootScope.isSplashOpen = true;

    $scope.selectExample = function (i) {
        $scope.current = i;
        $scope.code = examples[i].code;
    };

    $scope.selectExample(0);
});
