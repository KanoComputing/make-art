var app = require('../app');

app.controller('PlaygroundController', function ($scope) {
    $scope.exportDialogs = [
        'save',
        'share'
    ];

    $scope.playground = {
        code : localStorage.playgroundCode || ''
    };
});
