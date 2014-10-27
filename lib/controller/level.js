var app = require('../app'),
    levels = require('../levels/index'),
    language = require('../language/index'),
    session = require('../language/session');

var successMessages = [
    'Well done!',
    'Nice one!',
    'Cool beans!',
    'You Wizard!',
    'Keep casting!'
];

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
        setTimeout(function () {
            if (session.steps && $scope.content.validate(language.strip($scope.code), session.steps || [])) {
                setTimeout(function () {
                    $scope.completed = true;
                    $scope.$apply();
                }, 1000);
            }
        });
    };

    $scope.successMessage = function () {
        return successMessages[$scope.id % successMessages.length];
    };
});