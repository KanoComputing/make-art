# Define variables for car colors
colors =
    car    : '#e96a38'
    tyre   : 'black'
    rim    : 'grey'
    win    : 'lightblue'
    ground : '#333'
    bg     : '#63879d'

# Define function to draw background
bg = (bgColor) ->
    moveTo 'left', 'top'
    color bgColor
    square 500

# Define function to draw a wheel
wheel = ->
    color colors.tyre
    circle 50
    color colors.rim
    circle 30
    stroke 0

# Define function to draw a window
wind = ->
    color colors.win
    rectangle 90, 60

# Define function to draw the car
car = ->
    move -150, -20
    color colors.car
    rectangle 300, 100
    move 70, 100
    wheel()
    move 160
    wheel()
    move -200, -180
    color colors.car
    rectangle 240, 80
    move 20, 20
    wind()
    move 110
    wind()
    move -240, 210

# Define function to draw the ground
ground = ->
    color colors.ground
    rectangle 460, 100

stroke 0
bg colors.bg
moveTo 'center', 'center'
car()
ground()