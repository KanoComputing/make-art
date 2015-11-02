'use strict';
/*
 * Feedback Screen Controller
 *
 * Opens up when on main route
 */

var app = require('../app');

app.controller('FeedbackController', function ($scope, $rootScope, $timeout) {

    $scope.isFeedbackSplashOpen = false;
    $scope.submitted = false;

    $scope.handleClick = function () {
        document.querySelector('.form-message').classList.remove('hide');
        document.querySelector('.form-container').classList.add('hide');
        document.querySelector('.feedback-buttons').classList.add('hide');

        $scope.submitted = true;
        $timeout(function () {
            $rootScope.isFeedbackSplashOpen = false;
        }, 2500);
    };

    $scope.handleSkip = function (e) {
        e.preventDefault();
        $rootScope.isFeedbackSplashOpen = false;
    };
});
