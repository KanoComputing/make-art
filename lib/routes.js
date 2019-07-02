import i18n from './i18n.js';
import { app } from './app.js';
/*
 * Routes module
 *
 * Initialise routes htom here
 */
let pathHistory = [];

function logLocationPath(routeParameters, locationPath, locationSearch) {
    console.log('locationPath', locationPath)
    pathHistory.push(locationPath)
    console.log('pathHistory', pathHistory)
    return undefined
}


app.config(function ($routeProvider, _config) {
    const challengeRoute = {
        templateUrl: function (location) {
            let path = i18n.getHtmlLocalePath(_config.APP_ROOT) + '/challenges.html';
            // console.log('path', path)
            return path
        },
        controller: 'ChallengesController',
        redirectTo: logLocationPath
    };


    let redirectionToChallengesByDefault = { //Object.create(challengeRoute)
    /*redirectionToChallengesByDefault.*/redirectTo: function () {
        return '/challenges'
    }}

    $routeProvider
        .when('/', redirectionToChallengesByDefault)
        // Challenges selection view
        .when('/challenges', challengeRoute)
        // Challenge view (With challenge ID)
        .when('/challenge/:world/:id', {
            templateUrl: function (location) {
                let path = i18n.getHtmlLocalePath(_config.APP_ROOT) + '/challenge.html';
                console.log('location route', location.id, location.world)
                return path
            },
            controller: 'ChallengeController',
            redirectTo: logLocationPath
        })
        // Challenge view (With only worldID)
        .when('/challenges/:world/', challengeRoute)
        // Playground view
        .when('/playground', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/playground.html',
            controller: 'PlaygroundController',
            redirectTo: logLocationPath
        })
        // Load share item by ID view
        .when('/share/:id', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/share.html',
            controller: 'ShareController',
            redirectTo: logLocationPath
        })
        // Launch a local share
        .when('/localLoad/:path*', {
            templateUrl: i18n.getHtmlLocalePath(_config.APP_ROOT) + '/share.html',
            controller: 'LocalLaunchController',
            redirectTo: logLocationPath
        })
        .otherwise({ redirectTo: '/' });
});
