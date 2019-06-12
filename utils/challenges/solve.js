/**
 * Solves a challenge specified in the filename
 */
"use strict";
const path = require('path');
function run() {
    console.log('solve.js => 1')
    var fileName = process.argv[2],
        challenge;
    if (!fileName) {
        throw "Missing name of the challenge use: \n node solve.js challengePath";
    }
    challenge = require(path.resolve(fileName));
    challenge.steps.forEach(function (step) {
        console.log(step.solution);
    });
}

run();
