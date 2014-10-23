var app = require('../app'),
    levels = require('../levels/index'),
    language = require('../language/index');

app.controller('level', function ($scope, $routeParams) {
    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $scope.mode = 'reading';
    $scope.content = levels[$scope.id - 1];
    $scope.code = $scope.content.code;
    $scope.slide = 0;
    $scope.hasNext = levels.length > $scope.id;
    $scope.slides = $scope.content.slides.split('---').map(function (val) {
        return val.trim();
    });

    $scope.nextSlide = function () {
        $scope.slide += 1;
    };

    $scope.doneReading = function () {
        $scope.mode = 'coding';
    };

    $scope.validate = function () {
        if ($scope.content.validate(language.strip($scope.code))) {
            setTimeout(function () {
                $scope.completed = true;
                $scope.$apply();
            }, 1000);
        }
    };
});