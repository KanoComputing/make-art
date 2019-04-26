export default {
    "es-AR": [
        {
            "commands": [
                {
                    "unlockedAt": 1, 
                    "args": [
                        [
                            "radius", 
                            "number", 
                            "Tamaño del círculo", 
                            true
                        ]
                    ], 
                    "call": "circle", 
                    "description": "Dibuja un círculo", 
                    "defaults": [
                        100
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "radius-x", 
                            "number", 
                            "Ancho de la elipse", 
                            true
                        ], 
                        [
                            "radius-y", 
                            "number", 
                            "Altura de la elipse", 
                            true
                        ]
                    ], 
                    "call": "ellipse", 
                    "description": "Dibuja una elipse", 
                    "defaults": [
                        50, 
                        100
                    ]
                }, 
                {
                    "unlockedAt": 2, 
                    "args": [
                        [
                            "size", 
                            "number", 
                            "Tamaño del cuadrado", 
                            true
                        ]
                    ], 
                    "call": "square", 
                    "description": "Dibuja un cuadrado", 
                    "defaults": [
                        200
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "width", 
                            "number", 
                            "Ancho del rectángulo", 
                            true
                        ], 
                        [
                            "height", 
                            "number", 
                            "Altura del rectángulo", 
                            true
                        ]
                    ], 
                    "call": "rectangle", 
                    "description": "Dibuja un rectángulo", 
                    "defaults": [
                        100, 
                        200
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "radius", 
                            "number", 
                            "Tamaño", 
                            true
                        ], 
                        [
                            "start", 
                            "number", 
                            "El punto de inicio (entre 0 y 2)", 
                            true
                        ], 
                        [
                            "end", 
                            "number", 
                            "El punto de fin (entre 0 y 2)", 
                            true
                        ], 
                        [
                            "close", 
                            "bool", 
                            "Cierra la figura", 
                            false
                        ]
                    ], 
                    "call": "arc", 
                    "description": "Dibuja parte de un círculo", 
                    "defaults": [
                        100, 
                        1, 
                        2, 
                        true
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x1", 
                            "number", 
                            "Indica la posición X", 
                            true
                        ], 
                        [
                            "y1", 
                            "number", 
                            "Indica la posición Y", 
                            true
                        ], 
                        [
                            "...", 
                            "", 
                            "Más puntos de posición del polígono", 
                            true
                        ], 
                        [
                            "close", 
                            "bool", 
                            "Cierra la figura en el medio", 
                            false
                        ]
                    ], 
                    "call": "polygon", 
                    "description": "Dibuja una figura de muchos lados", 
                    "defaults": [
                        0, 
                        0, 
                        100, 
                        0, 
                        100, 
                        100
                    ]
                }
            ], 
            "icon": "shapes", 
            "label": "Figuras"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 3, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "Distancia horizontal", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "Distancia vertical", 
                            false
                        ]
                    ], 
                    "call": "line", 
                    "description": "Dibuja una línea de un determinado tamaño", 
                    "defaults": [
                        100, 
                        50
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "El punto de destino horizontal", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "El punto de destino vertical", 
                            true
                        ]
                    ], 
                    "call": "lineTo", 
                    "description": "Dibuja una línea hasta un determinado punto", 
                    "defaults": [
                        0, 
                        0
                    ]
                }
            ], 
            "icon": "lines", 
            "label": "Líneas"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 6, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "Distancia horizontal", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "Distancia vertical", 
                            false
                        ]
                    ], 
                    "call": "move", 
                    "description": "Mueve el cursor una determinada distancia", 
                    "defaults": [
                        100, 
                        50
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "El punto de destino horizontal", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "El punto de destino vertical", 
                            true
                        ]
                    ], 
                    "call": "moveTo", 
                    "description": "Mueve el cursor a una determinada posición", 
                    "defaults": [
                        "center", 
                        "center"
                    ]
                }
            ], 
            "icon": "position", 
            "label": "Posición"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "message", 
                            "string", 
                            "El mensaje a escribir", 
                            true
                        ]
                    ], 
                    "call": "text", 
                    "description": "Escribe texto", 
                    "defaults": [
                        "Say something!"
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "font", 
                            "string", 
                            "El nombre de la fuente", 
                            false
                        ], 
                        [
                            "size", 
                            "number", 
                            "El tamaño del texto en píxeles", 
                            false
                        ]
                    ], 
                    "call": "font", 
                    "description": "Configura el tamaño y/o la fuente", 
                    "defaults": [
                        "Bariol", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "state", 
                            "bool", 
                            "Estado de la negrita (Verdadero es el predeterminado)", 
                            false
                        ]
                    ], 
                    "call": "bold", 
                    "description": "Activa la negrita (verdadero) o desactívala (falso)", 
                    "defaults": [
                        true
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "state", 
                            "bool", 
                            "Estado de la cursiva (Verdadero es el predeterminado)", 
                            false
                        ]
                    ], 
                    "call": "italic", 
                    "description": "Activa la cursiva (verdadero) o desactívala (falso)", 
                    "defaults": [
                        true
                    ]
                }
            ], 
            "icon": "text", 
            "label": "Texto"
        }, 
        {
            "commands": [
                {
                    "description": "Repetir código", 
                    "args": [
                        [
                            "i in [x..y]", 
                            "number", 
                            "Punto de inicio y fin de la variable i", 
                            true
                        ]
                    ], 
                    "call": "for", 
                    "defaults": null, 
                    "unlockedAt": 9, 
                    "example": "for i in [1..5]\n    circle i"
                }, 
                {
                    "description": "Obtén un número aleatorio dentro de un rango.", 
                    "args": [
                        [
                            "min", 
                            "number", 
                            "El valor mínimo", 
                            true
                        ], 
                        [
                            "max", 
                            "number", 
                            "El valor máximo", 
                            true
                        ], 
                        [
                            "float", 
                            "bool", 
                            "Configura a verdadero para recibir valores decimales", 
                            false
                        ]
                    ], 
                    "call": "random", 
                    "defaults": [
                        5, 
                        10
                    ], 
                    "unlockedAt": 9, 
                    "example": "random 5, 10"
                }
            ], 
            "icon": "general", 
            "label": "General"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "El color del fondo a configurar", 
                            true
                        ]
                    ], 
                    "call": "background", 
                    "description": "Configura el color del fondo", 
                    "defaults": [
                        "blue"
                    ]
                }, 
                {
                    "unlockedAt": 4, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "El color del objeto a configurar", 
                            true
                        ]
                    ], 
                    "call": "color", 
                    "description": "Cambia el color en uso", 
                    "defaults": [
                        "red"
                    ]
                }, 
                {
                    "unlockedAt": 5, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "El color a usar - Ej. 'red', 'blue'..", 
                            false
                        ], 
                        [
                            "size", 
                            "number", 
                            "(número) El ancho a usar", 
                            false
                        ]
                    ], 
                    "call": "stroke", 
                    "description": "Cambia el color y el ancho del trazo (borde)", 
                    "defaults": [
                        10, 
                        "purple"
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "monto del brillo a configurar (-100 a 100)", 
                            false
                        ]
                    ], 
                    "call": "setBrightness", 
                    "description": "Configura el brillo del color", 
                    "defaults": [
                        "yellow", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "monto de saturación a configurar (-100 a 100)", 
                            false
                        ]
                    ], 
                    "call": "setSaturation", 
                    "description": "Configura la saturación del color", 
                    "defaults": [
                        "grey", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color a cambiar", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "tono a configurar (-360 - 360)", 
                            true
                        ]
                    ], 
                    "call": "rotate", 
                    "description": "Cambia el tono de un color en base a un determinado valor", 
                    "defaults": [
                        "red", 
                        100
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color a saturar", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "monto de opacidad (-100 a 100)", 
                            true
                        ]
                    ], 
                    "call": "setTransparency", 
                    "description": "Configura cómo se ve a través de un color", 
                    "defaults": [
                        "black", 
                        50
                    ]
                }
            ], 
            "icon": "colors", 
            "label": "Colores"
        }
    ], 
    "en": [
        {
            "commands": [
                {
                    "unlockedAt": 1, 
                    "args": [
                        [
                            "radius", 
                            "number", 
                            "The circle size", 
                            true
                        ]
                    ], 
                    "call": "circle", 
                    "description": "Draw a circle", 
                    "defaults": [
                        100
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "radius-x", 
                            "number", 
                            "The ellipse width", 
                            true
                        ], 
                        [
                            "radius-y", 
                            "number", 
                            "The ellipse height", 
                            true
                        ]
                    ], 
                    "call": "ellipse", 
                    "description": "Draw an ellipse", 
                    "defaults": [
                        50, 
                        100
                    ]
                }, 
                {
                    "unlockedAt": 2, 
                    "args": [
                        [
                            "size", 
                            "number", 
                            "The square size", 
                            true
                        ]
                    ], 
                    "call": "square", 
                    "description": "Draw a square", 
                    "defaults": [
                        200
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "width", 
                            "number", 
                            "The rectangle width", 
                            true
                        ], 
                        [
                            "height", 
                            "number", 
                            "The rectangle height", 
                            true
                        ]
                    ], 
                    "call": "rectangle", 
                    "description": "Draw a rectangle", 
                    "defaults": [
                        100, 
                        200
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "radius", 
                            "number", 
                            "The size", 
                            true
                        ], 
                        [
                            "start", 
                            "number", 
                            "The start point (between 0 to 2)", 
                            true
                        ], 
                        [
                            "end", 
                            "number", 
                            "The end point (between 0 to 2)", 
                            true
                        ], 
                        [
                            "close", 
                            "bool", 
                            "Close the shape", 
                            false
                        ]
                    ], 
                    "call": "arc", 
                    "description": "Draw part of a circle", 
                    "defaults": [
                        100, 
                        1, 
                        2, 
                        true
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x1", 
                            "number", 
                            "Point X position", 
                            true
                        ], 
                        [
                            "y1", 
                            "number", 
                            "Point Y position", 
                            true
                        ], 
                        [
                            "...", 
                            "", 
                            "More polygon points positions", 
                            true
                        ], 
                        [
                            "close", 
                            "bool", 
                            "Close the path in the middle", 
                            false
                        ]
                    ], 
                    "call": "polygon", 
                    "description": "Draw a many sided shape", 
                    "defaults": [
                        0, 
                        0, 
                        100, 
                        0, 
                        100, 
                        100
                    ]
                }
            ], 
            "label": "Shapes", 
            "icon": "shapes"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 3, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "Horizontal distance", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "Vertical distance", 
                            false
                        ]
                    ], 
                    "call": "line", 
                    "description": "Draw a line of a certain size", 
                    "defaults": [
                        100, 
                        50
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "The horizontal destination", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "The vertical destination", 
                            true
                        ]
                    ], 
                    "call": "lineTo", 
                    "description": "Draw a line to a certain point", 
                    "defaults": [
                        0, 
                        0
                    ]
                }
            ], 
            "label": "Lines", 
            "icon": "lines"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 6, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "Horizontal distance", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "Vertical distance", 
                            false
                        ]
                    ], 
                    "call": "move", 
                    "description": "Move the cursor a certain distance away", 
                    "defaults": [
                        100, 
                        50
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "The horizontal destination", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "The vertical destination", 
                            true
                        ]
                    ], 
                    "call": "moveTo", 
                    "description": "Move the cursor to a particular position", 
                    "defaults": [
                        "center", 
                        "center"
                    ]
                }
            ], 
            "label": "Position", 
            "icon": "position"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "message", 
                            "string", 
                            "The message to write", 
                            true
                        ]
                    ], 
                    "call": "text", 
                    "description": "Write text", 
                    "defaults": [
                        "Say something!"
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "font", 
                            "string", 
                            "The font family name", 
                            false
                        ], 
                        [
                            "size", 
                            "number", 
                            "The text size in pixels", 
                            false
                        ]
                    ], 
                    "call": "font", 
                    "description": "Set size and/or font", 
                    "defaults": [
                        "Bariol", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "state", 
                            "bool", 
                            "Bold state (True by default)", 
                            false
                        ]
                    ], 
                    "call": "bold", 
                    "description": "Sets bold text on (true) or off (false)", 
                    "defaults": [
                        true
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "state", 
                            "bool", 
                            "Italic state (True by default)", 
                            false
                        ]
                    ], 
                    "call": "italic", 
                    "description": "Sets italic text on (true) or off (false)", 
                    "defaults": [
                        true
                    ]
                }
            ], 
            "label": "Text", 
            "icon": "text"
        }, 
        {
            "commands": [
                {
                    "description": "Repeat code", 
                    "args": [
                        [
                            "i in [x..y]", 
                            "number", 
                            "The start and end point for the variable i", 
                            true
                        ]
                    ], 
                    "call": "for", 
                    "defaults": null, 
                    "unlockedAt": 9, 
                    "example": "for i in [1..5]\n    circle i"
                }, 
                {
                    "description": "Get a random number in a range.", 
                    "args": [
                        [
                            "min", 
                            "number", 
                            "The minimum value", 
                            true
                        ], 
                        [
                            "max", 
                            "number", 
                            "The maximum value", 
                            true
                        ], 
                        [
                            "float", 
                            "bool", 
                            "Set to true to return decimal values", 
                            false
                        ]
                    ], 
                    "call": "random", 
                    "defaults": [
                        5, 
                        10
                    ], 
                    "unlockedAt": 9, 
                    "example": "random 5, 10"
                }
            ], 
            "label": "General", 
            "icon": "general"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "The background color to set", 
                            true
                        ]
                    ], 
                    "call": "background", 
                    "description": "Set the background color", 
                    "defaults": [
                        "blue"
                    ]
                }, 
                {
                    "unlockedAt": 4, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "The object color to set", 
                            true
                        ]
                    ], 
                    "call": "color", 
                    "description": "Change the color in use", 
                    "defaults": [
                        "red"
                    ]
                }, 
                {
                    "unlockedAt": 5, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "A string with the color to use - E.g. 'red', 'blue'..", 
                            false
                        ], 
                        [
                            "size", 
                            "number", 
                            "(number) The width to use", 
                            false
                        ]
                    ], 
                    "call": "stroke", 
                    "description": "Change the width and color of the stroke (border)", 
                    "defaults": [
                        10, 
                        "purple"
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "amount of brightness to set (-100 to 100)", 
                            false
                        ]
                    ], 
                    "call": "setBrightness", 
                    "description": "Set a colour's brightness", 
                    "defaults": [
                        "yellow", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "amount of saturation to set (-100 to 100)", 
                            false
                        ]
                    ], 
                    "call": "setSaturation", 
                    "description": "Set a colour's saturation", 
                    "defaults": [
                        "grey", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color to rotate", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "angle to rotate (-360 - 360)", 
                            true
                        ]
                    ], 
                    "call": "rotate", 
                    "description": "Rotate a color's hue angle by given amount", 
                    "defaults": [
                        "red", 
                        100
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "Color to saturate", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "amount of opacity to subtract (-100 to 100)", 
                            true
                        ]
                    ], 
                    "call": "setTransparency", 
                    "description": "Set how see through a color is", 
                    "defaults": [
                        "black", 
                        50
                    ]
                }
            ], 
            "label": "Colors", 
            "icon": "colors"
        }
    ], 
    "ja": [
        {
            "commands": [
                {
                    "unlockedAt": 1, 
                    "args": [
                        [
                            "radius", 
                            "number", 
                            "円形の大きさ（半径）", 
                            true
                        ]
                    ], 
                    "call": "circle", 
                    "description": "円形を描く", 
                    "defaults": [
                        100
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "radius-x", 
                            "number", 
                            "楕円の横幅", 
                            true
                        ], 
                        [
                            "radius-y", 
                            "number", 
                            "楕円の高さ", 
                            true
                        ]
                    ], 
                    "call": "ellipse", 
                    "description": "楕円を描く", 
                    "defaults": [
                        50, 
                        100
                    ]
                }, 
                {
                    "unlockedAt": 2, 
                    "args": [
                        [
                            "size", 
                            "number", 
                            "四角の大きさ", 
                            true
                        ]
                    ], 
                    "call": "square", 
                    "description": "四角を描く", 
                    "defaults": [
                        200
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "width", 
                            "number", 
                            "長方形の幅", 
                            true
                        ], 
                        [
                            "height", 
                            "number", 
                            "長方形の高さ", 
                            true
                        ]
                    ], 
                    "call": "rectangle", 
                    "description": "長方形を描く", 
                    "defaults": [
                        100, 
                        200
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "radius", 
                            "number", 
                            "大きさ（半径）", 
                            true
                        ], 
                        [
                            "start", 
                            "number", 
                            "開始点（０〜２）", 
                            true
                        ], 
                        [
                            "end", 
                            "number", 
                            "最後の点（０〜２）", 
                            true
                        ], 
                        [
                            "close", 
                            "bool", 
                            "形を閉じるかどうか", 
                            false
                        ]
                    ], 
                    "call": "arc", 
                    "description": "円形の一部を描く", 
                    "defaults": [
                        100, 
                        1, 
                        2, 
                        true
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x1", 
                            "number", 
                            "ー点目のX値", 
                            true
                        ], 
                        [
                            "y1", 
                            "number", 
                            "ー点目のY値", 
                            true
                        ], 
                        [
                            "...", 
                            "", 
                            "他の点の位置", 
                            true
                        ], 
                        [
                            "close", 
                            "bool", 
                            "パスを真ん中に閉じるかどうか", 
                            false
                        ]
                    ], 
                    "call": "polygon", 
                    "description": "多辺形を描く", 
                    "defaults": [
                        0, 
                        0, 
                        100, 
                        0, 
                        100, 
                        100
                    ]
                }
            ], 
            "label": "形", 
            "icon": "shapes"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 3, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "水平距離", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "垂直距離", 
                            false
                        ]
                    ], 
                    "call": "line", 
                    "description": "ある大きさの線を描く", 
                    "defaults": [
                        100, 
                        50
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "水平の目的点", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "垂直の目的点", 
                            true
                        ]
                    ], 
                    "call": "lineTo", 
                    "description": "ある点までに線を描く", 
                    "defaults": [
                        0, 
                        0
                    ]
                }
            ], 
            "label": "線", 
            "icon": "lines"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 6, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "水平距離", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "垂直距離", 
                            false
                        ]
                    ], 
                    "call": "move", 
                    "description": "カーソルをある距離に動かす", 
                    "defaults": [
                        100, 
                        50
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "x", 
                            "number", 
                            "水平目的点", 
                            true
                        ], 
                        [
                            "y", 
                            "number", 
                            "垂直目的点", 
                            true
                        ]
                    ], 
                    "call": "moveTo", 
                    "description": "カーソルをある位置までに動かす", 
                    "defaults": [
                        "center", 
                        "center"
                    ]
                }
            ], 
            "label": "位置", 
            "icon": "position"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "message", 
                            "string", 
                            "メッセージ", 
                            true
                        ]
                    ], 
                    "call": "text", 
                    "description": "文字を書く", 
                    "defaults": [
                        "何か言って！"
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "font", 
                            "string", 
                            "フォントファミリー名", 
                            false
                        ], 
                        [
                            "size", 
                            "number", 
                            "ピクセルでのフォントの大きさ", 
                            false
                        ]
                    ], 
                    "call": "font", 
                    "description": "フォントや大きさを設定", 
                    "defaults": [
                        "Bariol", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "state", 
                            "bool", 
                            "太字の状態(デフォルトはtrue)", 
                            false
                        ]
                    ], 
                    "call": "bold", 
                    "description": "太字を有効(true)または無効(false)", 
                    "defaults": [
                        true
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "state", 
                            "bool", 
                            "車体の状態(デフォルトはtrue)", 
                            false
                        ]
                    ], 
                    "call": "italic", 
                    "description": "車体を有効(true)または無効(false)", 
                    "defaults": [
                        true
                    ]
                }
            ], 
            "label": "テキスト", 
            "icon": "text"
        }, 
        {
            "commands": [
                {
                    "description": "コードを繰り返す", 
                    "args": [
                        [
                            "i in [x..y]", 
                            "number", 
                            "i変数の最初と最後の値", 
                            true
                        ]
                    ], 
                    "call": "for", 
                    "defaults": null, 
                    "unlockedAt": 9, 
                    "example": "for i in [1..5]\n    circle i"
                }, 
                {
                    "description": "ある範囲内でランダムな数字を生成する", 
                    "args": [
                        [
                            "min", 
                            "number", 
                            "最低値", 
                            true
                        ], 
                        [
                            "max", 
                            "number", 
                            "最高地", 
                            true
                        ], 
                        [
                            "float", 
                            "bool", 
                            "trueにすると少数が得られる", 
                            false
                        ]
                    ], 
                    "call": "random", 
                    "defaults": [
                        5, 
                        10
                    ], 
                    "unlockedAt": 9, 
                    "example": "random 5, 10"
                }
            ], 
            "label": "一般", 
            "icon": "general"
        }, 
        {
            "commands": [
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "設定したい背景の色", 
                            true
                        ]
                    ], 
                    "call": "background", 
                    "description": "背景の色を設定する", 
                    "defaults": [
                        "blue"
                    ]
                }, 
                {
                    "unlockedAt": 4, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "設定したい鉛筆の色", 
                            true
                        ]
                    ], 
                    "call": "color", 
                    "description": "鉛筆の色を変える", 
                    "defaults": [
                        "red"
                    ]
                }, 
                {
                    "unlockedAt": 5, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "設定したい色。例えば'red', 'blue'..", 
                            false
                        ], 
                        [
                            "size", 
                            "number", 
                            "鉛筆の太さ", 
                            false
                        ]
                    ], 
                    "call": "stroke", 
                    "description": "筆の太さと色を変える", 
                    "defaults": [
                        10, 
                        "purple"
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "色", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "設定したい明るさ(-100〜100)", 
                            false
                        ]
                    ], 
                    "call": "setBrightness", 
                    "description": "色の明るさを設定する", 
                    "defaults": [
                        "yellow", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "色", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "設定したい飽和(-100〜100)", 
                            false
                        ]
                    ], 
                    "call": "setSaturation", 
                    "description": "色の飽和を設定する", 
                    "defaults": [
                        "grey", 
                        30
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "変えたい色", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "回転の角度(-360〜360)", 
                            true
                        ]
                    ], 
                    "call": "rotate", 
                    "description": "色相を回転させる（変更する）", 
                    "defaults": [
                        "red", 
                        100
                    ]
                }, 
                {
                    "unlockedAt": 999, 
                    "args": [
                        [
                            "color", 
                            "string", 
                            "色", 
                            true
                        ], 
                        [
                            "amount", 
                            "number", 
                            "引き算する不透明度(-100〜100)", 
                            true
                        ]
                    ], 
                    "call": "setTransparency", 
                    "description": "色の透明度を設定する", 
                    "defaults": [
                        "black", 
                        50
                    ]
                }
            ], 
            "label": "色", 
            "icon": "colors"
        }
    ]
}
