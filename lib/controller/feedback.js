/*
 * Feedback Screen Controller
 *
 * Opens up when on main route
 */

var app = require('../app'),
    ACTION_URL = 'https://docs.google.com/forms/d/1sGwcGfjhUK2oz52VRMbnv_1j3a5wMlD0TU0Ms9EpzO8/formResponse';

app.controller('FeedbackController', function ($scope, $rootScope, $http) {
    $scope.handleClick = function () {
        var input = angular.element(document.querySelector('.feedback-splash form input')),
            textarea = angular.element(document.querySelector('.feedback-splash form textarea')),
            out = {};

        out[input[0].name] = input[0].value;
        out[textarea[0].name] = textarea[0].value;
        console.log(out);
        $http({
            method: 'POST',
            url: ACTION_URL,
            data: {
                form: out
            }
        });
        $rootScope.isFeedbackSplashOpen = false;
    };
});
