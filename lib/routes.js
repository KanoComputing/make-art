var app = require('./app');

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', { templateUrl: '/main.html', controller: 'main' })
    .when('/level', { templateUrl: '/level.html', controller: 'level' })
    .when('/level/:id', { templateUrl: '/level.html', controller: 'level' })
    .when('/playground', { templateUrl: '/playground.html', controller: 'playground' })
    .otherwise({ redirectTo: '/' });
});