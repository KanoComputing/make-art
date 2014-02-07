app = require '../app'

app.directive 'display', ($window) ->

    {
        restrict: 'A'
        templateUrl: 'directive/display.html'
        scope: ngSource: '=ngSource'
        link: (scope, element, attrs) ->
            scope.canvas = element[0]
            scope.ctx = scope.canvas.getContext '2d'

            scope.getCenter = -> x: scope.width / 2, y: scope.height / 2

            scope.update = -> # api.run scope, scope.ngSource or ''

            scope.resize = ->
                scope.ratio = window.devicePixelRatio or 1

                scope.width = scope.canvas.offsetWidth
                height = scope.canvas.offsetHeight

                scope.canvas.width = scope.width * scope.ratio
                scope.canvas.height = scope.height * scope.ratio

            win = angular.element $window
            win.bind 'resize', -> scope.$apply scope.resize

            scope.resize()
            scope.update()

            scope.$watch 'ngSource', scope.update
    }