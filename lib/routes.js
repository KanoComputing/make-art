var app = require('./app');

/*
 * Routes module
 * Initialise routes htom here
 */

app.config(function ($routeProvider) {
    $routeProvider

    // Main view
    .when('/', {
        templateUrl : '/main.html',
        controller  : 'MainController'
    })

    // Level view (Defaults to first level)
    .when('/level', {
        templateUrl : '/level.html',
        controller  : 'LevelController'
    })

    // Level view (With level ID)
    .when('/level/:id', {
        templateUrl : '/level.html',
        controller  : 'LevelController'
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