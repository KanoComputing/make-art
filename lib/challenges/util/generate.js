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
        validateOptions = [],
        addedLength = 0,
        validateOption;

    sequence.forEach(function (options) {
        var hint = options[0],
            solutionLine = options[1],
            settings = options[3] || {},
            validateArr;

        validateOption = options[2];

        if (typeof validateOption === 'function') {
            validateOption = validateOption();
        }

        if (settings.override) {
            validateOptions = validateOptions.slice(
                0, validateOptions.length - addedLength
                );
        }

        addedLength = validateOption.length;

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

export default {
    fromSequence : generateFromSequence
};