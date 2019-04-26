import deepEqual from 'deep-equal';

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
export const contains = function (a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
    }

    return true;
};