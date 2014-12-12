var app = require('../app'),
    api = require('../api');

app.controller('loadDialog', function($scope, $window) {
    var win = angular.element($window);

    $scope.isOpen = false;

    $scope.openDialog = function() {
        $scope.isOpen = true;
    };

    $scope.load = {
        inject : function(fileData) {
            $scope.playground.code = fileData;
            $scope.isOpen = false;

            $scope.$apply();
        },
        local : function(fileinput) {
            var file = fileinput.files[0],
                reader = new FileReader();

            reader.onload = function(evt) {
                var fileData = evt.target.result;

                $scope.load.inject(fileData);
            };

            reader.readAsText(file);
        },
        web : function() {
            api.challengeIO.web.load(function(challenge) {
                $scope.load.inject(challenge);
            });
        }
    };

    win.bind('keydown', function (e) {
        if (e.keyCode === 27) {
            $scope.isOpen = false;
            $scope.$apply();
        }
    });

});

