# Setup style
stroke '#333', 6
color '#444'

# Loop over y axis
for y in [0..15]
    # Loop over x axis
    for x in [0..15]
        # Set position and draw a circle
        moveTo x * 30, y * 30
        circle 30