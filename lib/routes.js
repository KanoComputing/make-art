var app = require('./app');

/*
 * Routes module
 *
 * Initialise routes htom here
 */

app.config(function ($routeProvider) {
    $routeProvider

    // Main view
    .when('/', {
        templateUrl : '/main.html',
        controller  : 'MainController'
    })

    // Challenge view (Defaults to first challenge)
    .when('/challenge', {
        templateUrl : '/challenge.html',
        controller  : 'ChallengeController'
    })

    // Challenges selection view
    .when('/challenges', {
        templateUrl : '/challenges.html',
        controller  : 'ChallengesController'
    })

    // Challenge view (With challenge ID)
    .when('/challenge/:id', {
        templateUrl : '/challenge.html',
        controller  : 'ChallengeController'
    })

    // Playground view
    .when('/playground', {
        templateUrl : '/playground.html',
        controller  : 'PlaygroundController'
    })

    // Load share item by ID view
    .when('/share/:id', {
        templateUrl : '/share.html',
        controller  : 'ShareController'
    })

    .otherwise({ redirectTo: '/' });
});