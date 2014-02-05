session = require './session'
utils = require './utils'

moveTo = (x = 0, y = 0) ->
    { x, y } = utils.parseCoordinates x, y

    session.pos = { x, y }

    x = session.pos.x * session.ratio
    y = session.pos.y * session.ratio

    session.ctx.moveTo x, y

move = (x, y = 0) ->
    moveTo session.pos.x + x, session.pos.y + y

module.exports = { moveTo, move }