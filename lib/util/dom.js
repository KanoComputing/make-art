/*
 * Dom utilities
 *
 * Collection of basic DOM utilities
 */

/*
 * Recursive function to check if given node is or is child of another node
 * @return void
 */
export const isIncludedBy = function isIncludedBy(target, parent) {
    if (target === parent) { return true; }

    if (target.parentNode) {
        return isIncludedBy(target.parentNode, parent);
    }

    return false;
};

export default { isIncludedBy }