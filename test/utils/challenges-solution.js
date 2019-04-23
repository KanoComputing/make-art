"use strict";
const challenges = {
    'Sunny Day': {
        solution: [
            'background blue',
            'color yellow',
            'circle 150'
        ]

    },
    'Swiss Flag': {
        solution: [
            'background red',
            'stroke 66',
            'stroke white',
            'line 100',
            'line -100',
            'line 0, 100',
            'line 0, -100'
        ]

    },
    'Stare in the dark': {
        solution: [
            'background black',
            'move -80',
            'color white',
            'ellipse 60, 40',
            'color black',
            'circle 10',
            'move 160',
            'color white',
            'ellipse 60, 40',
            'color black',
            'circle 10'
        ]

    },
    'Your first face': {
        solution: [
            'color yellow',
            'stroke black, 20',
            'circle 200',
            'move -80, -80',
            'color black',
            'circle 20',
            'move 160',
            'circle 20',
            'moveTo 250, 270',
            'arc 100, 1, 2'
        ]

    },
    'Blue Balloon': {
        solution: [
            'color blue',
            'stroke 0',
            'circle 100',
            'move 0, 100',
            'polygon 15, 15, -15, 15',
            'move 0, 15',
            'stroke black, 5',
            'line 0, 200'
        ]

    },
    'Stickman': {
        solution: [
            'stroke black, 10',
            'move 0, -50',
            'line 0, 150',
            'line -80, 120',
            'line 80, 120',
            'move 0, 150',
            'line -80, 120',
            'line 80, 120',
            'moveTo 250, 100',
            'stroke 0',
            'polygon -60, 50, 0, 100, 60, 50',
        ]

    },
};

const names = Object.keys(challenges);

module.exports = {
    challenges: challenges,
    names: names
};