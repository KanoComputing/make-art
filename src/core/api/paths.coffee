session = require './session'
space = require './space'
utils = require './utils'

lineTo = (x, y) ->
    space.moveTo session.pos.x, session.pos.y
    { x, y } = utils.parseCoordinates x, y
    utils.startShape()
    session.ctx.moveTo session.pos.x, session.pos.y
    session.ctx.lineTo x, y
    utils.endShape()
    space.moveTo x, y

line = (x, y = 0) ->
    lineTo session.pos.x + x, session.pos.y + y

module.exports = { lineTo, line }