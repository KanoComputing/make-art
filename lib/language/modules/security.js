/* jshint evil: true */

/*
 * Security module
 *
 * Override core object in the language scope to evaluate in a secured scope
 */

module.exports = {

    // Override window
    window   : null,

    // Override document
    document : null,

    // Override console
    // console  : null

};