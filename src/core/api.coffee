coffee = require 'coffee-script'
session = require './api/session'
general = require './api/general'

{ clear, reset } = require './api/general'
{ lineTo, line } = require './api/paths'
{ background, color, strokeColor, strokeWidth, stroke } = require './api/setters'
{ rectangle, square, ellipse, circle } = require './api/shapes'
{ moveTo, move } = require './api/space'

reset = (display) ->
    session.display = display
    session.ctx = display.ctx
    session.settings = null
    general.reset()

run = (display, code) ->
    reset display

    try
        compiled = coffee.compile code
    catch error
        console.log "[ Compile error ] #{error}"
        return

    try
        eval compiled
    catch error
        console.log "[ API error ] #{error}:"
        return

module.exports = { run }