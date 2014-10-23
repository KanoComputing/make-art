var app = angular.module('draw', [ 'ngRoute' ]);

app.config(function ($locationProvider) {

    if (window.history && window.history.pushState) {
        $locationProvider.html5Mode(true);
    }

});

module.exports = app;