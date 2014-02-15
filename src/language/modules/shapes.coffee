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

    startingAngle = 0
    endingAngle = 2 * Math.PI; # 360 degrees is equal to 2π radians

    session.ctx.save()
    session.ctx.translate x, y
    session.ctx.scale rx, ry
    session.ctx.arc 0, 0, 1, startingAngle, endingAngle, -1
    session.ctx.restore()

    utils.endShape()

circle = (radius) ->
    ellipse radius, radius

module.exports = { rectangle, square, ellipse, circle }