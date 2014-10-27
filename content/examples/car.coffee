colors =
    car: '#e96a38'
    tyre: 'black'
    rim: 'grey'
    win: 'lightblue'
    ground: '#333'
    bg: '#63879d'

bg = ->
    moveTo 'left', 'top'
    color colors.bg
    square 500

wheel = ->
    color colors.tyre
    circle 50
    color colors.rim
    circle 30
    stroke 0

wind = ->
    color colors.win
    rectangle 90, 60

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

ground= ->
    color colors.ground
    rectangle 460, 100

stroke 0
bg()
moveTo 'center', 'center'
car()
ground()