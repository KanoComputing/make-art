var i18n = require('./i18n'),
    app = require('./app');

/*
 * Routes module
 *
 * Initialise routes htom here
 */

app.config(function ($routeProvider) {
    $routeProvider

    // Challenges selection view
    .when('/challenges', {
        templateUrl : i18n.getLocalePath() + '/challenges.html',
        controller  : 'ChallengesController'
    })

    // Challenge view (With challenge ID)
    .when('/challenge/:world/:id', {
        templateUrl : i18n.getLocalePath() + '/challenge.html',
        controller  : 'ChallengeController'
    })

    // Challenge view (With only worldID)
    .when('/challenges/:world/', {
        templateUrl : i18n.getLocalePath() + '/challenges.html',
        controller  : 'ChallengesController'
    })

    // Playground view
    .when('/playground', {
        templateUrl : i18n.getLocalePath() + '/playground.html',
        controller  : 'PlaygroundController'
    })

    // Load share item by ID view
    .when('/share/:id', {
        templateUrl : i18n.getLocalePath() + '/share.html',
        controller  : 'ShareController'
    })

    // Launch a local share
    .when('/localLoad/:path*', {
        templateUrl : i18n.getLocalePath() + '/share.html',
        controller  : 'LocalLaunchController'
    })

    .otherwise({ redirectTo: '/challenges' });
});
