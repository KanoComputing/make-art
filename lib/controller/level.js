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

app.controller('level', function ($scope, $routeParams, $window) {
    var win = angular.element($window);

    $scope.id = $routeParams.id ? parseInt($routeParams.id, 10) : 1;
    $scope.lastChallengeVisited.set($scope.id);
    $scope.content = levels[$scope.id - 1];
    $scope.code = $scope.content.code;
    $scope.hasNext = levels.length > $scope.id;
    $scope.slides = $scope.content.slides.split('---').map(function (val) {
        return val.trim();
    });

    $scope.nextSlide = function () {
        $scope.slide += 1;
    };

    $scope.startReading = function () {
        $scope.slide = 0;
        $scope.mode = 'reading';
    };

    $scope.doneReading = function () {
        $scope.mode = 'coding';
    };

    $scope.startReading();

    $scope.validate = function () {
        setTimeout(function () {
            if (session.steps && $scope.content.validate(language.strip($scope.code), session.steps || [])) {
                setTimeout(function () {
                    $scope.completed = true;
                    $scope.$apply();

                    $scope.progress.update($scope.id + 1);
                }, 1000);
            }
        });
    };

    $scope.successMessage = function () {
        return successMessages[$scope.id % successMessages.length] +
            ' You completed challenge ' + $scope.id + ' and earned ' + $scope.xpGain + 'xp!';
    };

    $scope.openIntro = function() {
        $scope.startReading();
        $scope.isIntroOpen = true;
    };

    $scope.closeIntro = function() {
        $scope.doneReading();
        $scope.isIntroOpen = false;
    };

    $scope.openIntro();
    $scope.isLevelCompleteOpen = false;

    $scope.openLevelComplete = function() {
        $scope.isLevelCompleteOpen = true;
    };

    $scope.closeLevelComplete = function() {
        $scope.isLevelCompleteOpen = false;
    };

    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $scope.closeIntro();
            $scope.$apply();
        }
    });
});
