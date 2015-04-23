/*
 * Generate challenge steps from sequence of commands executed in linear order.
 * Simplifies the process of creating a regular challenge adding only the current
 * command to the solution for each step instead of re-writing it at all steps
 *
 * @param sequence
 * @return [{Object}]
 */
function generateFromSequence(sequence) {
    var steps = [],
        solutionLines = [],
        validateOptions = [];

    sequence.forEach(function (options) {
        var hint = options[0],
            solutionLine = options[1],
            validateOption = options[2],
            validateArr;

        if (typeof validateOption === 'function') {
            validateOption = validateOption();
        }

        solutionLines.push(solutionLine);
        validateOptions = validateOptions.concat(validateOption);
        validateArr = validateOptions.slice(0);

        steps.push({
            hint     : hint,
            solution : solutionLines.join('\n'),
            validate : function () {
                return this.isSequence(validateArr);
            }
        });
    });

    return steps;
}

module.exports = {
    fromSequence : generateFromSequence
};