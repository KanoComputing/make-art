app = require '../app'

app.directive 'display', ($window) ->

    {
        restrict: 'E'
        templateUrl: 'directive/display.html'
        scope: ngSource: '=ngSource'
        link: (scope, element, attrs) ->
            scope.canvas = element.find('canvas')[0]
            scope.ctx = scope.canvas.getContext '2d'

            scope.getCenter = -> x: scope.width / 2, y: scope.height / 2

            scope.update = ->
                language = require '../language/index'

                settings = scope

                language.run scope.ngSource, settings

            scope.resize = ->
                scope.ratio = window.devicePixelRatio or 1

                scope.width = scope.canvas.offsetWidth
                scope.height = scope.canvas.offsetHeight

                scope.canvas.width = scope.width * scope.ratio
                scope.canvas.height = scope.height * scope.ratio

                scope.update()

            win = angular.element $window
            win.bind 'resize', -> scope.$apply scope.resize

            scope.resize()

            scope.$watch 'ngSource', scope.update
    }