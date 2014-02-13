app = require '../app'
levels = require '../levels/index'

app.controller 'level', ($scope, $routeParams) ->
    $scope.id = parseInt $routeParams.id, 10
    $scope.mode = 'reading'
    $scope.content = levels[$scope.id - 1]