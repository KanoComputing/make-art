# Choose a background color
color '#555'

# Move to top-left corner
moveTo 'left', 'top'

# Draw the background
square 500

# Define the lines color
stroke '#333', 3

# Define the fill color
color 'rgba(255, 255, 255, .5)'

# Move over the top-right corner
moveTo 520, -50

###
Draw 35 squares from the current position,
going 25 left and 15 down at each iteration
###
for i in [0..35]
    move -25, 15
    square 10 * i