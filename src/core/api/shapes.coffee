session = require './session'
utils = require './utils'

rectangle = (width, height) ->
    utils.startShape()
    session.ctx.rect session.pos.x, session.pos.y, width, height
    utils.endShape()

square = (size) ->
    rectangle size, size

ellipse = (rx, ry) ->
    utils.startShape()
    session.ctx.ellipse session.pos.x, session.pos.y, rx, ry, 0, 0, 2 * Math.PI, false
    utils.endShape()

circle = (radius) ->
    ellipse radius, radius

module.exports = { rectangle, square, ellipse, circle }