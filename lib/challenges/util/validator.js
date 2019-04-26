"use strict";

import stringUtil from '../../util/string';

export default function (steps, synonyms)  {

    var validateString = function (regex, str) {
        var reg = new RegExp(regex);
        return !!reg.exec(str); //just the boolean result
    },
    /**
     * Replaces synonyms in a rule
     * @param  {string} rule The rule
     * @return {string} The modified rule
     */
    addSynonims = function (rule) {
        //add the synonims
        if (typeof synonyms === "object") {
            Object.keys(synonyms).forEach(function (baseWord) {
                var syns = synonyms[baseWord],
                    newWord = '(' + baseWord; //synonyms for 1 word

                if (rule.indexOf(baseWord) > -1) {
                    syns.forEach(function (key) {
                        newWord = newWord + '|' + key;
                    });
                    newWord = newWord + ')';
                    rule = rule.replace(baseWord, newWord);
                }
            });
        }
        return rule;
    },
    /**
     * Completes the regex:
     *  -  adding EOL and beginning of line
     *  - making whitespaces optional
     * @param  {[type]} rule [description]
     * @return {[type]}      [description]
     */
    completeRegex = function (rule) {

        //remove all the spaces around ,*()[]=
        rule = rule.replace(/ *([\,\(\)\[\]\=]|\.\.) */g, "$1");

        //make all the spaces optional
        rule = rule.replace(/([,\[\]=\/\<\>]|\.\.)/g, " ?$1 ?");

        //escape brackets, dash
        rule = rule.replace(/[\[\]\.\(\)]/g, "\\$&");

        //escape math operators
        rule = rule.replace(/[\+\-\*\/\%]/g, "\\$&");

        //add the synonims
        rule = addSynonims(rule);

        rule = "^" + rule + " *$";

        //NOTE: the regex comes out correct, but not particularly clean from here
        return rule;
    },

    validateSingleRule = function (rule, line) {
        var fn;
        if (typeof rule === "string") {
            if (rule.indexOf("@@") === 0) {
                //if a rule starts with @@ what follows needs to be escaped
                rule = rule.substr(2, rule.length - 1);
                rule = stringUtil.escapeRegex(rule);
            } else if (rule.indexOf("__") === 0) {
                //If a rule is prefixed with __ it will be left untouched
                rule = rule.substr(2, rule.length - 1);
            } else {
                rule = completeRegex(rule);
            }
            return validateString(rule, line);
        } else if (typeof rule === "object") {
            if (rule.type === "function") {
                /*jshint evil: true*/
                eval("fn = " + rule.fn);
                /*jshint evil: false*/
                return fn(line);
            }
        }
        return false;
    },
    validator = {
        /**
         * Validates a step (possibly many rules and many lines)
         * @param  {Array/String} rules An array or a string containing the rules to be validated
         * @param  {object} lines An array of lines that should be matched against the steps
         * @return {object}       [description]
         */
        validateStep: function (rules, lines) {
            var res = true,
                rep = {valid: false};
            if (rules instanceof Array) {
                rules.forEach(function (rule, idx) {
                    var line = lines[idx];
                    res = res && validateSingleRule(rule, line);
                });
            } else {
                res = validateSingleRule(rules, lines[0]);
            }
            rep.valid = res;
            return rep;
        },
        /**
         * Checks all the steps in the code.
         * It returns a report in the following form:
         * {
         *     lastValidStep: 12,
         *     report: {
         *         steps: [
         *             {valid: true, lines: [12]},
         *             {valid: true, lines: [13]},
         *             {valid: true, lines: [14]},
         *             {valid: true, lines: [16,17]},
         *             {valid: false, lines: [18,19]},
         *             {valid: false, lines: [20]}
         *         ]
         *     }
         * }
         * @param  {string} code        all the code written so far
         * @param  {all the steps} steps       [description]
         * @param  {[type]} currentStep [description]
         * @return {object}             A report of the result
         */
        validate: function (code) {
            var lines = code.split('\n'),
                report = {lastValidStep: null, steps: [], complete: false},
                currentLine = 0,
                validSteps = 0,
                validCode = true,
                firstBrokenLine = null;


            steps.forEach(function (step, stepIdx) {
                var rules = step.validate || step.solution,
                    i,
                    currLines = [],
                    stepReport,
                    firstLineOfStep = currentLine;
                //every step could be made of more than 1 line
                if (rules instanceof Array) {
                    for (i = 0; i < rules.length; i++) {
                        currLines.push(lines[currentLine]);
                        currentLine++;
                    }
                } else {
                    currLines.push(lines[currentLine]);
                    currentLine++;
                }
                //validate the rules and the lines we have
                stepReport = validator.validateStep(rules, currLines);
                stepReport.lines = [];

                validCode = validCode && stepReport.valid;

                if (firstBrokenLine === null && !validCode) {
                    firstBrokenLine = stepIdx;
                }

                if (stepReport.valid) {
                    report.lastValidStep = stepIdx;
                    validSteps++;

                }
                for (i = 0; i < currLines.length; i++) {
                    //TODO: this could possibly done cleaner
                    stepReport.lines.push(i + firstLineOfStep);
                }
                report.steps.push(stepReport);
            });
            report.complete = validSteps === steps.length;
            report.firstBrokenLine = firstBrokenLine;
            return report;
        },
        private: {
            completeRegex: completeRegex
        }
    };
    return validator;
};

