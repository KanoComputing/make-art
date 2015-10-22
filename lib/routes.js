var app = require('./app');

/*
 * Routes module
 *
 * Initialise routes htom here
 */

app.config(function ($routeProvider) {
    $routeProvider

    // Challenges selection view
    .when('/challenges', {
        templateUrl : '/challenges.html',
        controller  : 'ChallengesController'
    })

    // Challenge view (With challenge ID)
    .when('/challenge/:world/:id', {
        templateUrl : '/challenge.html',
        controller  : 'ChallengeController'
    })

    // Challenge view (With only worldID)
    .when('/challenges/:world/', {
        templateUrl : '/challenges.html',
        controller  : 'ChallengesController'
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

    // Launch a local share
    .when('/localLoad/:path*', {
        templateUrl : '/share.html',
        controller  : 'LocalLaunchController'
    })

    .otherwise({ redirectTo: '/challenges' });
});
