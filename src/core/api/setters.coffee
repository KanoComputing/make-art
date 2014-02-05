session = require './session'
utils = require './utils'

background = (color) ->
    session.settings.bg = color

strokeColor = (color) ->
    session.settings.stroke.color = color
    session.ctx.strokeStyle = color

strokeWidth = (val) ->
    session.settings.stroke.width = val
    session.ctx.lineWidth = val * session.ratio

stroke = (style) ->
    style = utils.parseLineStyle arguments

    if style.color? then strokeColor style.color
    if style.width? then strokeWidth style.width

color = (color) ->
    session.ctx.fillStyle = color

module.exports = { background, strokeColor, strokeWidth, stroke, color }