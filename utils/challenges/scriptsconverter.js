"use strict";

var fs = require('fs'),
    challenges = [
        'japan',
        'sweden',
        'stare',
        'smiley',
        'baloon',
        'stickman',
        'shrinking',
        'random',
        'starry',
        'house',
    //  'medal',
        'dots',
        'gradient',
        'planet',
        'pizza',
        'breakfast'
    ],
    baseDir = "../../lib/challenges/",
    jsonBaseDir = "../../lib/challenges/descriptors/",
    SUCCESS_MESSAGES = [
            'Nice work! That is one cool flag!', //Japan
            'Cool beans - enough of flags, let\'s try something else!', //Sweden
            'You Wizard! The next time I need spooky eyes I know who to call!', //Stare
            'Nice! Keep up the good work you face drawing genius!', //Smiley
            'Awesome balloon! Why not change the color before moving on?', //Blue balloon
            'Nice one! The canvas is 500 wide and 500 high, moving about on it is a skill!', //Stickman
            'Great! For loops let us repeat bits of code (it saves on all the typing)!', //Shrinking
            'Random functions give us a random number so we can put things in a surprise spot.', //random
            'Awesome! Press space and see what happens to the stars...', //Starry
            'You built an awesome house with code!', //House
            'Mathematical! Change the numbers and see what happens.', //Dots
            'Try changing the numbers in the rotate function and see what happens.', //Gradient
            'Astronomical! Change the colors and see what you can add to make your planet even cooler before hitting share!', //planet
            'Tasty! Finish it off with more toppings, let your imagination run wild and see what you can make, then share it with the world!', //Pizza
            'Well done!', //null
        ];

console.log("Length " + challenges.length + SUCCESS_MESSAGES.length);
challenges.forEach(function (fileName, idx) {
    var challenge = require(baseDir + fileName),
        solution = challenge.steps[challenge.steps.length - 1].solution,
        solLength = solution.split('\n').length,
        stepsLength = challenge.steps.length,
        formattedJSON;

    challenge.completion_text = SUCCESS_MESSAGES[idx];
    challenge.steps.forEach(function (step, idx) {
        var sol = step.solution.split('\n');
        step.solution = sol[idx];
        step.validate = "^" + sol[idx] + "$";
    });



    if (solLength !== stepsLength) {
        console.log("----- " + fileName + " requires more attention");
    }

    formattedJSON = JSON.stringify(challenge, null, 4);
    fs.writeFile(jsonBaseDir + fileName + '.json', formattedJSON, function (err) {
        if (err) {
            throw err;
        }
    });


    /*challenge.steps.forEach(function(step) {
        console.log(JSON.stringify(step, null, 4));
    });*/

});
