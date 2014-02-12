session = require '../session'
utils = require '../utils'

rectangle = (width, height) ->
    utils.startShape()

    x = session.pos.x * session.ratio
    y = session.pos.y * session.ratio

    width *= session.ratio
    height *= session.ratio

    session.ctx.rect x, y, width, height
    utils.endShape()

square = (size) ->
    rectangle size, size

ellipse = (rx, ry) ->
    utils.startShape()

    x = session.pos.x * session.ratio
    y = session.pos.y * session.ratio

    rx *= session.ratio
    ry *= session.ratio

    session.ctx.ellipse x, y, rx, ry, 0, 0, 2 * Math.PI, false
    utils.endShape()

circle = (radius) ->
    ellipse radius, radius

module.exports = { rectangle, square, ellipse, circle }