import i18n from './i18n.js';
import { app } from './app.js';
/*
 * Routes module
 *
 * Initialise routes htom here
 */
app.config(function ($routeProvider, _config) {
    const challengeRoute = {
        templateUrl: function (location) {
            let path = i18n.getHtmlLocalePath(_config.APP_ROOT) + '/challenges.html';
            return path
        },
        controller: 'ChallengesController'
    };

    $routeProvider
        .when('/', challengeRoute)
        // Challenges selection view
        .when('/challenges', challengeRoute)
        // Challenge view (With challenge ID)
        .when('/challenge/:world/:id', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/challenge.html',
            controller: 'ChallengeController'
        })
        // Challenge view (With only worldID)
        .when('/challenges/:world/', challengeRoute)
        // Playground view
        .when('/playground', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/playground.html',
            controller: 'PlaygroundController'
        })
        // Load share item by ID view
        .when('/share/:id', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/share.html',
            controller: 'ShareController'
        })
        // Launch a local share
        .when('/localLoad/:path*', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/share.html',
            controller: 'LocalLaunchController'
        })
        .otherwise({ redirectTo: '/' });
});
