# Setup background style
stroke 0
color '#b7f3f2'

# Draw background
moveTo 'left', 'top'
rectangle 460, 460

# Setup pattern style
color '#3cb6d4'

# Loop throught Y 23 times
for x in [ 0 .. 23 ]
    # Loop throught X 23 times
    for y in [ 0 .. 23 ]
        # Draw diamond
        moveTo x * 20, y * 20
        polygon 10, 0, 0, 10, -10, 0, 0, -10, 10, true