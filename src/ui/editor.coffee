init = ->
    element = document.getElementById 'editor'
    editor = ace.edit element
    session = editor.getSession()

    editor.setTheme 'ace/theme/dawn'
    session.setMode 'ace/mode/coffee'
    session.setUseSoftTabs false
    session.setUseWrapMode false
    editor.setHighlightActiveLine false
    editor.setShowPrintMargin true
    editor.setReadOnly false

module.exports = { init }