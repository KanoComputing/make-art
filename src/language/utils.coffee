session = require './session'

CURSOR_SIZE = 10
CURSOR_WEIGHT = 1

startShape = ->
    session.ctx.beginPath()

endShape = ->
    session.ctx.closePath()
    session.ctx.fill()
    session.ctx.stroke()

parseLineStyle = (attributes) ->
    out = {}

    for attr in attributes
        if typeof attr is 'number'
            out.width = attr
        else
            out.color = attr

    out

parseCoordinate = (val, type = 'x') ->
    if typeof val is 'string'
        if type is 'x'
            switch val
                when 'center' then return getCenter().x
                when 'right' then return session.width
                when 'left' then return 0
        else if type is 'y'
            switch val
                when 'center' then return getCenter().y
                when 'bottom' then return session.height
                when 'top' then return 0
    val

parseCoordinates = (x, y) ->
    x = @parseCoordinate x, 'x'
    y = @parseCoordinate y, 'y'
    { x, y }

drawCursor = (pos, color = 'rgba(0, 0, 0, .4)') ->
    ratio = session.ratio

    session.ctx.strokeStyle = color
    session.ctx.lineWidth = CURSOR_WEIGHT * ratio

    startShape()
    session.ctx.moveTo (pos.x - CURSOR_SIZE / 2) * ratio, pos.y * ratio
    session.ctx.lineTo (pos.x + CURSOR_SIZE / 2) * ratio, pos.y * ratio
    session.ctx.moveTo pos.x * ratio, (pos.y - CURSOR_SIZE / 2) * ratio
    session.ctx.lineTo pos.x * ratio, (pos.y + CURSOR_SIZE / 2) * ratio
    endShape()
    session.ctx.strokeStyle = session.settings.stroke.color
    session.ctx.lineWidth = session.settings.stroke.width * ratio
    session.ctx.moveTo pos.x, pos.y

getCenter = -> x: session.width / 2, y: session.height / 2

module.exports = {
    startShape,
    endShape,
    parseLineStyle,
    parseCoordinate,
    parseCoordinates,
    drawCursor,
    getCenter
}