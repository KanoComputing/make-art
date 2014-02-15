app = require '../app'

dont =false
defaults =
    theme: 'ace/theme/dawn',
    wrapMode: false,
    highlighLine: false,
    showRuler: true
    readOnly: false
    mode: 'ace/mode/coffee'
    softTabs: true

app.directive 'editor', () ->

    {
        restrict: 'E'
        templateUrl: '/directive/editor.html'
        scope: ngModel: '=ngModel'
        link: (scope, element, attrs) ->
            options = defaults

            scope.ngModel = scope.ngModel or element[0].innerHTML

            engine = ace.edit element[0]
            session = engine.getSession()

            engine.setTheme options.theme
            session.setUseWrapMode options.wrapMode
            engine.setHighlightActiveLine options.highlighLine
            engine.setShowPrintMargin options.showRuler
            engine.setReadOnly options.readOnly

            session.setMode options.mode
            session.setUseSoftTabs options.softTabs

            engine.on 'change', ->
                val = session.getValue()

                if val isnt scope.ngModel and not scope.$root.$$phase
                    scope.ngModel = val
                    scope.$apply()

            scope.$watch 'ngModel', ->
                if session.getValue() isnt scope.ngModel
                    dont = true
                    engine.setValue scope.ngModel
                    engine.focus()
                    engine.getSession().selection.clearSelection();

            focus: => engine.focus()
    }