import objectUtil from '../../util/object';

/*
 * Challenge assertion function
 *
 * @param {String} code
 * @param [{Object}] steps
 * @return {Object}
 */
function challengeAssert(code, steps) {

    return {

        /*
         * Has given number of steps or any steps at all
         *
         * @param {Number*} count
         * @return {Boolean}
         */
        hasSteps: function (count) {
            return count ? steps.length === count : !!steps.length;
        },

        /*
         * Step at given index matches given type and options
         *
         * @param {String} type
         * @param {Object*} options
         * @param {Number*} index
         * @return {Boolean}
         */
        stepEquals: function (type, options, index) {
            options = options || {};

            var step = steps[index];

            if (!step) { return false; }

            if (typeof options === 'function') {
                return options(step.options);
            }

            if (type === step.type && objectUtil.contains(step.options, options)) {
                return true;
            }

            return false;
        },

        /*
         * Has called command of given type with matching options
         *
         * @param {String} type
         * @param {Object*} options
         * @param {Number*} index
         * @return {Boolean}
         */
        hasStepLike: function (type, options, index) {
            var step, i;

            if (typeof index === 'number') {
                return this.stepEquals(type, options, index);
            }

            for (i = 0; i < steps.length; i += 1) {
                step = steps[i];

                if (this.stepEquals(type, options, i)) {
                    return true;
                }
            }

            return false;
        },

        /*
         * Has drawn a circle with given radius
         *
         * @param {Number*} x
         * @param {Number*} y
         * @param {Number*} radius
         * @param {Number*} index
         * @return {Boolean}
         */
        hasDrawnCircle: function (x, y, radius, index) {
            var options = { isCircle : true };

            if (x !== null) { options.x = x; }
            if (y !== null) { options.y = y; }
            if (radius !== null) { options.rx = radius; }

            return this.hasStepLike('ellipse', options, index);
        },

        /*
         * Verify if code written matches a list of command calls
         *
         * @param {[Array]} steps
         * @return {Boolean}
         */
        isSequence: function (sequence) {
            if (steps.length !== sequence.length) {
                return false;
            }

            for (var i = 0; i < sequence.length; i += 1) {
                if (!this.hasStepLike(sequence[i][0], sequence[i][1], i)) {
                    return false;
                }
            }

            return true;
        }

    };

}

export default challengeAssert;