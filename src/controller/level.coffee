app = require '../app'
levels = require '../levels/index'
language = require '../language/index'

app.controller 'level', ($scope, $routeParams) ->
    $scope.id = parseInt $routeParams.id, 10
    $scope.mode = 'reading'
    $scope.content = levels[$scope.id - 1]
    $scope.code = $scope.content.code

    $scope.slide = 0

    $scope.hasNext = levels.length > $scope.id

    $scope.nextSlide = ->
        $scope.slide++

    $scope.doneReading = ->
        $scope.mode = 'coding'

    $scope.validate = ->
        if $scope.content.validate language.strip $scope.code
            $scope.completed = true