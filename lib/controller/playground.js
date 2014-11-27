var app = require('../app');

app.controller('playground', function ($scope, $rootScope) {
    $scope.exportDialogs = [
        'save',
        'share',
    ];

    $scope.playground = {
        code : $rootScope.code
    };
});
