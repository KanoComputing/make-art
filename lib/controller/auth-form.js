'use strict';
/*
 * Login Form Controller
 *
 * Opens up the login form.
 */

var app = require('../app');

app.controller('AuthController', ['$scope', '$rootScope', '$element', 'API', 'AUTH', function ($scope, $rootScope, $element, api, auth) {
    var loginForm = $element.find('kano-login-form')[0],
        signupForm = $element.find('kano-signup-form')[0];

    $scope.mode = 'login';
    $scope.toggleMode = function () {
        $scope.mode = $scope.mode === 'login' ? 'signup' : 'login';
    };

    $scope.onSuccess = function (ev) {
        $scope.$apply(function () {
            auth.login(ev.details);
            $rootScope.loggedIn = auth.getState();
            $rootScope.user = auth.getUser();
            $rootScope.auth.closeModal();
        });
    };

    $scope.close = function () {
        $rootScope.auth.closeModal();
    };

    loginForm.addEventListener('success', $scope.onSuccess);
    signupForm.addEventListener('success', $scope.onSuccess);

    loginForm.addEventListener('signup-click', $scope.$apply.bind($scope, $scope.toggleMode));
    signupForm.addEventListener('login-click', $scope.$apply.bind($scope, $scope.toggleMode));

}]);
