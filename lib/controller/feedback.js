'use strict';
/*
 * Feedback Screen Controller
 *
 * Opens up when on main route
 */

var app = require('../app');

app.controller('FeedbackController', function ($scope, $rootScope, $timeout) {
    $scope.isFeedbackSplashOpen = false;

    $scope.handleClick = function () {

        document.querySelector(".form-message").classList.remove('hide');
        document.querySelector(".form-container").classList.add('hide');

        $timeout(function () {
            $rootScope.isFeedbackSplashOpen = false;
        }, 1000);
    };

    $scope.handleSkip = function () {
        $rootScope.isFeedbackSplashOpen = false;
    };
});
