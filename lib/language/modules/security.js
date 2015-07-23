/* jshint evil: true */

/*
 * Security module
 *
 * Override core objects in the language scope to evaluate in a secured scope
 */

module.exports = {

    // Override window
    window   : null,

    // Override document
    document : null,

    // Override console
    console  : null,

    // Override localStorage
    localStorage: null,

    // Override Kano World SDK
    KW_SDK   : null,

    // Override Angular Object
    angular  : null,

    // Override app
    app      : null,

    // Override $
    $        : null,

    // Override alert
    alert    : null,

    // Override open
    open     : null

};