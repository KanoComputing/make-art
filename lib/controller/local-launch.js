import app from '../app';
var api;

app.controller('LocalLaunchController', function ($scope, $routeParams, $location, $rootScope) {
	api = $rootScope.api;
    $scope.path = $routeParams.path || null;

    api.challengeIO.localLoad($scope.path, function (fileData) {
        localStorage.playgroundCode = fileData;

        $scope.$apply(function () {
            $location.path('/playground');
        });

    });
});
