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

update = ->
    display.setCode(editor.value()).update()

bind = ->
    update()
    editor.engine.on 'change', update

init()

module.exports = { editor }