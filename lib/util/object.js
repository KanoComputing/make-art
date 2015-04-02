/*
 * Object utilities
 *
 * Collection of basic DOM utilities
 */

/*
 * Returns true if object a contains matching object b properties
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 */
exports.contains = function (a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            if (a[key] !== b[key]) {
                return false;
            }
        }
    }

    return true;
};