session = require './session'
utils = require './utils'

moveTo = (x = 0, y = 0) ->
    { x, y } = utils.parseCoordinates x, y
    session.pos = { x, y }
    session.ctx.moveTo session.pos.x, session.pos.y

move = (x, y = 0) ->
    moveTo session.pos.x + x, session.pos.y + y

module.exports = { moveTo, move }