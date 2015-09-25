
"use strict";
var getValidator = require('../../lib/challenges/util/validator'),
    assert = require("chai").assert;


describe("validator", function () {


    it("should validate empty stuff", function () {
        var v = getValidator([]),
            r = v.validate("");
        assert.deepEqual(r, {
            lastValidStep: null,
            steps: [],
            complete: true,
            firstBrokenLine: null
        });
    });


    it("should validate a simple string", function () {
        var rules = "print a, b",
            v = getValidator([{validate: rules}]),
            r = v.validate("print a, b"),
            r2 = v.validate("print c, d");
        assert.deepEqual(r,
            {
                lastValidStep: 0,
                steps: [
                    {valid: true, lines: [0]}
                ],
                complete: true,
                firstBrokenLine: null
            });
        //this isn't valid
        assert.deepEqual(r2,
            {
                lastValidStep: null,
                firstBrokenLine: 0,

                steps: [
                    {valid: false, lines: [0]}
                ],
                complete: false
            });
    });

    it("should validate an escaped regex", function () {
        var rules = "@@b = (x) ->",
            v = getValidator([{validate: rules}]),
            r = v.validate("b = (x) ->"),
            r2 = v.validate("b = (x)) ->");
        assert.deepEqual(r,
            {
                lastValidStep: 0,
                steps: [
                    {valid: true, lines: [0]}
                ],
                complete: true,
                firstBrokenLine: null
            });
        //this isn't valid
        assert.deepEqual(r2,
            {
                lastValidStep: null,
                firstBrokenLine: 0,

                steps: [
                    {valid: false, lines: [0]}
                ],
                complete: false
            });
    });

    it("should validate using a function", function () {
        var rules = {type: 'function', fn: "function (line) {return line === 'test';}"},
            v = getValidator([{validate: rules}]),
            r = v.validate("test"),
            r2 = v.validate("fail");

        assert.deepEqual(r,
            {
                lastValidStep: 0,
                steps: [
                    {valid: true, lines: [0]}
                ],
                complete: true,
                firstBrokenLine: null
            });
        //this isn't valid
        assert.deepEqual(r2,
            {
                lastValidStep: null,
                firstBrokenLine: 0,

                steps: [
                    {valid: false, lines: [0]}
                ],
                complete: false
            });

    });


    it("should validate an array of rules in a single step", function () {
        var rules = ["print a, b", "a = c", "b = c"],
            v = getValidator([{validate: rules}]),
            r = v.validate("print a, b\na = c\nb    = c");
        assert.deepEqual(r,
            {
                lastValidStep: 0,
                firstBrokenLine: null,

                steps: [
                    {valid: true, lines: [0, 1, 2]}
                ],
                complete: true
            });
    });


    it("should validate an array of steps with a single rule each", function () {
        var rules = ["print a, b", "a = c", "b = c"],
            v = getValidator([
                    {validate: rules[0]},
                    {validate: rules[1]},
                    {validate: rules[2]}
                ]),
            r = v.validate("print a, b\na = c\nb    = c");
        assert.deepEqual(r,
            {
                lastValidStep: 2,
                firstBrokenLine: null,

                steps: [
                    {valid: true, lines: [0]},
                    {valid: true, lines: [1]},
                    {valid: true, lines: [2]}

                ],
                complete: true
            });
    });


    it("should partially validate an array of steps with a single rule", function () {
        var rules = ["print a, b", "a = c", "d = c"],
            v = getValidator([
                    {validate: rules[0]},
                    {validate: rules[1]},
                    {validate: rules[2]}
                ]),
            r = v.validate("print a, b\na = c\nb    = c");
        assert.deepEqual(r,
            {
                lastValidStep: 1,
                firstBrokenLine: 2,
                steps: [
                    {valid: true, lines: [0]},
                    {valid: true, lines: [1]},
                    {valid: false, lines: [2]}

                ],
                complete: false
            });
    });


    it("should partially validate an array of steps with a single rule, with a `hole` ", function () {
        var rules = ["print a, b", "a = c", "d = c"],
            v = getValidator([
                    {validate: rules[0]},
                    {validate: rules[1]},
                    {validate: rules[2]},
                    {validate: rules[2]},
                    {validate: rules[2]},
                    {validate: rules[2]}
                ]),
            r = v.validate("print a, b\na = c\nb    = c\nd=c\nd=c\np=q");
        assert.deepEqual(r,
            {
                lastValidStep: 4,
                firstBrokenLine: 2,
                steps: [
                    {valid: true, lines: [0]},
                    {valid: true, lines: [1]},
                    {valid: false, lines: [2]},
                    {valid: true, lines: [3]},
                    {valid: true, lines: [4]},
                    {valid: false, lines: [5]}


                ],
                complete: false
            });
    });

    it("should partially validate an array of steps with multiple rules, with a `hole` ", function () {
        var rules = ["print a, b", "a = c *-20", "d = c"],
            v = getValidator([
                    {validate: rules[0]},
                    {validate: rules[1]},
                    {validate: rules[2]},
                    {validate: rules},
                    {validate: rules[2]},
                    {validate: rules[2]},
                    {validate: rules[2]}
                ]),
            r = v.validate("print a, b\na = c -20\nb = c\nprint a, b\na = c -20\nd=c\nd=c\nd=c\np=q");
        assert.deepEqual(r,
            {
                lastValidStep: 5,
                firstBrokenLine: 2,
                steps: [
                    {valid: true, lines: [0]},
                    {valid: true, lines: [1]},
                    {valid: false, lines: [2]},
                    {valid: true, lines: [3, 4, 5]},
                    {valid: true, lines: [6]},
                    {valid: true, lines: [7]},
                    {valid: false, lines: [8]}
                ],
                complete: false
            });
    });

    it("should validate an array of steps with multiple rules, with a `hole` ", function () {
        var rules = ["print a, b", "a = c", "d = c"],
            v = getValidator([
                    {validate: rules[0]},
                    {validate: rules[1]},
                    {validate: rules[2]},
                    {validate: rules},
                    {validate: rules[2]},
                    {validate: rules[2]},
                    {validate: rules[2]}
                ]),
            r = v.validate("print a, b\na = c\nd = c\nprint a, b\na = c\nd=c\nd=c\nd=c\nd=c");
        assert.deepEqual(r,
            {
                lastValidStep: 6,
                firstBrokenLine: null,
                steps: [
                    {valid: true, lines: [0]},
                    {valid: true, lines: [1]},
                    {valid: true, lines: [2]},
                    {valid: true, lines: [3, 4, 5]},
                    {valid: true, lines: [6]},
                    {valid: true, lines: [7]},
                    {valid: true, lines: [8]}
                ],
                complete: true
            });
    });
    describe(" - Internal functions",  function () {
        var priv = getValidator([]).private;
        describe(" - completeRegex ", function () {
            it("should replace the first space after the command with a .", function () {
                var res = priv.completeRegex("rectangle 500, 50");
                assert.equal(res, "^rectangle +500 *, *50 *$");
            });

            it("should replace the other spaces with a *", function () {
                var res = priv.completeRegex("command 12, 32");
                assert.equal(res, "^command +12 *, *32 *$");
            });
            it("should replace the other spaces with a *", function () {
                var res = priv.completeRegex("command 12, ..32");

                assert.equal(res, "^command +12 *, * *\\.\\. *32 *$");
            });
        });

    });

});

