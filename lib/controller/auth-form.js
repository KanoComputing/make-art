'use strict';
/*
 * Login Form Controller
 *
 * Opens up the login form.
 */

var app = require('../app');

app.controller('AuthController', ['$scope', '$rootScope', 'API', 'AUTH', function ($scope, $rootScope, api, auth) {

    // THIS IS NOT A PROPER SOLUTION, PLEASE PUT THIS IN
    // A DIRECTIVE WHEN YOU HAVE TIME (PROBABLY AROUND 2056)
    var loginForm = document.getElementById('kano-login-form');
    loginForm.addEventListener('success', function (ev) {
        $scope.$apply(function () {
            auth.login(ev.details);
            $rootScope.loggedIn = auth.getState();
            $rootScope.auth.closeModal();
        });
    });
}]);
