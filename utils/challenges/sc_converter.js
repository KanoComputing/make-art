"use strict";
/**
 * Script used to refactor old summercamp challenges to new ones.
 * @type {[type]}
 */
var fs = require('fs'),
    slugify = require('slugify'),
    challenges = [
        'day_one',
        'day_two',
        'day_three',
        'day_four',
        'day_five',
        'day_six',
        'day_seven',
        'day_eight',
        'day_nine',
        'day_ten',
        'day_eleven',
        'day_twelve',
        'day_thirteen',
        'day_fourteen',
        'day_fifteen',
        'day_sixteen',
        'day_seventeen',
        'day_eighteen',
        'day_nineteen',
        'day_twenty',
        'day_twentyone'
    ],
    baseDir = "../../lib/challenges/summer_camp/",
    jsonBaseDir = "../../lib/challenges/worlds/summercamp/",
    arr = [];

console.log("Length " + challenges.length);
challenges.forEach(function (fileName) {
    var challenge = require(baseDir + fileName),
        solution = (challenge.steps[challenge.steps.length - 1]) ? challenge.steps[challenge.steps.length - 1].solution : "",
        solLength = solution.split('\n').length,
        stepsLength = challenge.steps.length,
        formattedJSON,
        title,
        slugSource = challenge.short_title || challenge.title;
        //arr = [];

    title = slugify(slugSource.toLowerCase(), "_");
    /*challenge.id = title;
    challenge.steps.forEach(function (step, idx) {

        var sol = step.solution.split('\n');
        step.solution = sol[idx];
    });


    console.log(" ------------     " + title);

    if (solLength !== stepsLength) {
        console.log("----- " + title + " requires more attention");
    }

    formattedJSON = JSON.stringify(challenge, null, 4);
    fs.writeFile(jsonBaseDir + title + '.json', formattedJSON, function (err) {
        if (err) {
            throw err;
        }
    });
*/
 /*
    challenge.steps.forEach(function(step) {
        console.log(JSON.stringify(step, null, 4));
    });*/

    //console.log(JSON.stringify(challenge, null, 4));
    arr.push("./" + title);


});

    console.log(JSON.stringify(arr, null, 4));

