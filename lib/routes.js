var app = require('./app');

/*
 * Routes module
 *
 * Initialise routes htom here
 */

app.config(function ($routeProvider) {
    $routeProvider

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

    // Launch a local share
    .when('/localLoad/:path*', {
        templateUrl : '/share.html',
        controller  : 'LocalLaunchController'
    })

    // Summer camp landing
    .when('/summercamp', {
        templateUrl : '/summer-camp.html',
        controller  : 'SummerCampController'
    })

    // Summer camp challenges view
    .when('/summercamp/calendar', {
        templateUrl : '/summer-camp-calendar.html',
        controller  : 'SummerCampController'
    })

    // Summer camp challenge view (With Challenge ID)
    .when('/summercamp/challenge/:id', {
        templateUrl : '/summer-camp.html',
        controller  : 'SummerCampController'
    })


    .otherwise({ redirectTo: '/challenges' });
});
