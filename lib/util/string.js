/*
 * Splice function for string
 * @param {Number} index
 * @param {Number} count
 * @param {String} add
 * @return {String}
 */
exports.splice = function (str, index, count, add) {
    return str.slice(0, index) + (add || '') + str.slice(index + count);
};