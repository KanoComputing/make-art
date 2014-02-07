app = require './app'

app.config ($routeProvider) ->
    $routeProvider
    .when '/', templateUrl: 'main.html', controller: 'main'
    .otherwise redirectTo: '/'