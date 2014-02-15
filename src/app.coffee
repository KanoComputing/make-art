app = angular.module 'draw', [ 'ngRoute' ]

app.config ($locationProvider) ->

    # if window.history && window.history.pushState
    $locationProvider.html5Mode true

module.exports = app