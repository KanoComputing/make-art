module.exports =

    title: 'Draw!'

    validate: (code) ->
        /^square\s+[0-9]+$/.test code

    code: ' '

    slides: [

        '''
Now draw a square!

    square 100

Note: Unlike the circle, the cursor will be its top-left corner, not its center
        '''

    ]