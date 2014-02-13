app = require './app'

app.config ($routeProvider) ->
    $routeProvider
    .when '/', templateUrl: 'main.html', controller: 'main'
    .when '/level/:id', templateUrl: 'level.html', controller: 'level'
    .otherwise redirectTo: '/'