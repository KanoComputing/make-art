Editor = require './ui/Editor'
Display = require './ui/Display'

elements =
    editor: document.getElementById 'editor'
    display: document.getElementById 'display'

editor = new Editor elements.editor
display = new Display elements.display

init = ->
    editor.focus()
    bind()

bind = ->
    editor.engine.on 'change', =>
        lines = editor.value()
        display.setCode(lines).update()

init()

module.exports = { editor }