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
    baseDir = '../../lib/challenges/worlds/basic/';

challenges.forEach(function (ch) {
    var obj = require(baseDir + ch),
        formattedJSON;
    obj.cover = obj.id + '.png';
    formattedJSON = JSON.stringify(obj, null, 4);
    fs.writeFile(baseDir + ch + '.json', formattedJSON, function (err) {
        if (err) {
            throw err;
        }
    });
    console.log(" --------- " + ch);
    //console.log(formattedJSON);

});
