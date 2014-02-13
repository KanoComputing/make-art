# Define the line style
stroke '#888', 4

# Draw sin waves!
for y in [1..10]
    for x in [1..100]
        height = Math.sin(x / 7.3) * 50
        moveTo x * 5 + 2.6, y * 50 - 50 - height / 2
        line 0, height