session = require './session'

CURSOR_SIZE = 10

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
                when 'center' then return display.getCenter().x
                when 'right' then return display.width
                when 'left' then return 0
        else if type is 'y'
            switch val
                when 'center' then return display.getCenter().y
                when 'bottom' then return display.height
                when 'top' then return 0
    val

parseCoordinates = (x, y) ->
    x = @parseCoordinate x, 'x'
    y = @parseCoordinate y, 'y'
    { x, y }

drawCursor = (pos, color = '#000') ->
    startShape()
    session.ctx.strokeStyle = color
    session.ctx.moveTo pos.x - CURSOR_SIZE / 2, pos.y
    session.ctx.lineTo pos.x + CURSOR_SIZE / 2, pos.y
    session.ctx.moveTo pos.x, pos.y - CURSOR_SIZE / 2
    session.ctx.lineTo pos.x, pos.y + CURSOR_SIZE / 2
    endShape()
    session.ctx.strokeStyle = session.settings.stroke.color
    session.ctx.moveTo pos.x, pos.y

module.exports = {
    startShape,
    endShape,
    parseLineStyle,
    parseCoordinate,
    parseCoordinates,
    drawCursor
}