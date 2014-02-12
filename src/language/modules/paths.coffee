space = require './space'
session = require '../session'
utils = require '../utils'

lineTo = (x, y) ->
    ratio = session.ratio

    { x, y } = utils.parseCoordinates x, y

    space.moveTo session.pos.x, session.pos.y
    utils.startShape()
    session.ctx.moveTo session.pos.x * ratio, session.pos.y * ratio
    session.ctx.lineTo x * ratio, y * ratio
    utils.endShape()
    space.moveTo x, y

line = (x, y = 0) ->
    lineTo session.pos.x + x, session.pos.y + y

module.exports = { lineTo, line }