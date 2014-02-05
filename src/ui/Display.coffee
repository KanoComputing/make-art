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
        @ratio = window.devicePixelRatio or 1

        @width = @canvas.offsetWidth
        @height = @canvas.offsetHeight

        @canvas.width = @width * @ratio
        @canvas.height = @height * @ratio

    getCenter: -> x: @width / 2, y: @height / 2

module.exports = Display