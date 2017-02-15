'use strict';
/*
 * Login Form Controller
 *
 * Opens up the login form.
 */

var app = require('../app'),
    tracking = require('../core/tracking');

app.controller('AuthController', ['$scope', '$rootScope', '$element', 'API', 'AUTH', function ($scope, $rootScope, $element, api, auth) {
    var loginForm = $element.find('kano-login-form')[0],
        signupForm = $element.find('kano-signup-form')[0];

    $scope.mode = 'login';
    $scope.toggleMode = function () {
        $scope.mode = $scope.mode === 'login' ? 'signup' : 'login';
    };

    $scope.onSuccess = function (ev) {
        auth.login(ev.details, function (user) {
            $rootScope.updateUser(user);
            $rootScope.$apply(function () {
                $rootScope.auth.closeModal();
            });
        });
    };

    $scope.onSignupSuccess = function (ev) {
        tracking.dispatchTrackingEvent('signedUpToKanoWorld');
        $rootScope.updateUser(ev.details.user);
    };

    $scope.close = function () {
        $rootScope.auth.closeModal();
    };

    loginForm.addEventListener('success', $scope.onSuccess);
    signupForm.addEventListener('success', $scope.onSignupSuccess);
    signupForm.addEventListener('success', $scope.onSuccess);

    loginForm.addEventListener('signup-click', $scope.$apply.bind($scope, $scope.toggleMode));
    signupForm.addEventListener('login-click', $scope.$apply.bind($scope, $scope.toggleMode));

}]);
