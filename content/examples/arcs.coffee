colors = [ '#fed29e', '#edad61', '#f2a03f', '#f2763f' ]

# Setup style
stroke '#db8a4f', 4

# Loop over y axis
for y in [0..16]
    # Loop over x axis
    for x in [0..15]
        # Choose color
        color colors[Math.floor(Math.random() * colors.length)]
        # Set position and draw a circle
        moveTo x * 30, y * 30
        circle 30