module.exports =

    title: 'Draw!'

    validate: (code) ->
        /^circle\s+[0-9]+$/.test code

    code:
        '''
# Write the command here!
        '''

    slides: [

        '''
Start simple! Just draw a circle by writing

    circle 100

In the editor, and see what happens
        '''

        '''
[ Slide here ]
        '''

    ]