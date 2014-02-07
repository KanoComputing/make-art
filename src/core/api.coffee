coffee = require 'coffee-script'
config = require '../core/config'
session = require './api/session'
general = require './api/general'
utils = require './api/utils'

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
    session.ratio = display.ratio

run = (display, code) ->
    reset display

    try
        compiled = coffee.compile code
    catch error
        if config.DEBUG_LEVEL > 0
            console.warn "[ Compile error ] #{error}"
        return

    try
        eval compiled
    catch error
        if config.DEBUG_LEVEL > 0
            console.warn "[ API error ] #{error}:"
        return

    utils.drawCursor session.pos

module.exports = { run }