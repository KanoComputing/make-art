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
        scope: ngModel: '=', editable: '=', ngChange: '&'
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

            scope.focus = (selectAll = false) ->
                engine.focus()

                if not selectAll
                    engine.getSession().selection.clearSelection();
                else
                    engine.getSession().selection.selectAll();

            engine.on 'change', ->
                val = session.getValue()

                if val isnt scope.ngModel and not scope.$root.$$phase
                    scope.ngModel = val
                    scope.$apply()

            scope.$watch 'ngModel', ->
                if scope.ngChange
                    scope.ngChange()

                if session.getValue() isnt scope.ngModel
                    dont = true
                    engine.setValue scope.ngModel
                    scope.focus()

            scope.$watch 'editable', ->
                engine.setReadOnly not scope.editable

                if scope.editable
                    scope.focus true
                else
                    engine.blur()
    }