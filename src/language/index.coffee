coffee = require 'coffee-script'
config = require '../core/config'
session = require './session'
utils = require './utils'
general = require './modules/general'

{ clear, reset } = require './modules/general'
{ lineTo, line } = require './modules/paths'
{ background, color, strokeColor, strokeWidth, stroke } = require './modules/setters'
{ rectangle, square, ellipse, circle } = require './modules/shapes'
{ moveTo, move } = require './modules/space'

reset = (settings) ->
    session.ctx = settings.ctx
    session.width = settings.width
    session.height = settings.height
    session.ratio = settings.ratio
    general.reset()

run = (code, settings) ->
    reset settings

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