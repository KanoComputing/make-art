session = require './session'
space = require './space'
setters = require './setters'

clear = ->
    width = session.display.width * session.ratio
    height = session.display.height * session.ratio

    session.ctx.clearRect 0, 0, width, height
    session.ctx.fillStyle = session.settings.bg
    session.ctx.beginPath()
    session.ctx.rect 0, 0, width, height
    session.ctx.closePath()
    session.ctx.fill()

reset = ->
    session.pos = session.display.getCenter()

    session.settings =
        bg: '#fff'
        fill: '#333'
        stroke: width: 1, color: '#222'

    clear()

    space.moveTo session.pos.x, session.pos.y

    setters.background session.settings.bg

    setters.strokeColor session.settings.stroke.color
    setters.strokeWidth session.settings.stroke.width


module.exports = { clear, reset }