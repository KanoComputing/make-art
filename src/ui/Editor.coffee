_ = require 'lodash'

defaults =
    theme: 'ace/theme/dawn',
    wrapMode: false,
    highlighLine: false,
    showRuler: true
    readOnly: false
    mode: 'ace/mode/coffee'
    softTabs: true

class Editor

    constructor: (@element, options) ->
        options = _.extend {}, defaults, options

        @engine = ace.edit @element
        @session = @engine.getSession()

        @engine.setTheme options.theme
        @session.setUseWrapMode options.wrapMode
        @engine.setHighlightActiveLine options.highlighLine
        @engine.setShowPrintMargin options.showRuler
        @engine.setReadOnly options.readOnly

        @session.setMode options.mode
        @session.setUseSoftTabs options.softTabs

        @

    value: => @session.getValue()

    on: => @engine.on.apply @, arguments

    focus: => @engine.focus()

module.exports = Editor