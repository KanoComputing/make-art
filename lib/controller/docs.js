var app = require('../app');

app.controller('docs', function ($scope) {
    $scope.selectCategory = function (category) {
        $scope.current = category;
    };

    setTimeout(function() {
        $scope.selectCategory($scope.categories[0]);
        $scope.$apply();
    }, 0);

});
