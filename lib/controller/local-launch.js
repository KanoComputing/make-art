var app = require('../app'),
    api = require('../api');

app.controller('LocalLaunchController', function ($scope, $routeParams, $location) {
    $scope.path = $routeParams.path || null;

    api.challengeIO.localLoad($scope.path, function (fileData) {
        localStorage.playgroundCode = fileData;

        $scope.$apply(function () {
            $location.path('/playground');
        });

    });
});
