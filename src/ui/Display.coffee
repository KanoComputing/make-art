api = require '../core/api'

class Display

    constructor: (@canvas, @code = null) ->
        @ctx = @canvas.getContext '2d'
        @resize()
        @bind()
        @update()

    bind: -> window.addEventListener 'resize', @resize, false

    setCode: (@code) => @

    update: => api.run @, @code or ''

    resize: ->
        @width = @canvas.width = @canvas.offsetWidth
        @height = @canvas.height = @canvas.offsetHeight

    getCenter: -> x: @canvas.width / 2, y: @canvas.height / 2

module.exports = Display