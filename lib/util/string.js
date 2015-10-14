"use strict";

/*
 * String utilities
 *
 * Collection of basic DOM utilities
 */

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

/**
 * Escapes a string to be used as RegExp
 * @param  {string} value The string
 * @return {string}       The escaped string
 */
exports.escapeRegex = function (value) {
    return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
};
