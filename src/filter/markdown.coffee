app = require '../app'
marked = require 'marked'

config =
    renderer: new marked.Renderer()
    gfm: true
    tables: true
    breaks: false
    pedantic: false
    sanitize: true
    smartLists: true
    smartypants: false

marked.setOptions config

app.filter 'markdown', ($sce) -> (input) ->
    $sce.trustAsHtml marked input