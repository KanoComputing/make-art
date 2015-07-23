/*
 * Security module
 *
 * Override core objects in the language scope to evaluate in a secured scope
 */

var OVERRIDES = [
    'window',
    'Window',
    'document',
    'console',
    'alert',
    'localStorage',
    'KW_SDK',
    'angular',
    'app',
    '$',
    'open',
    'location',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'setTimeout',
    'setInterval'
];

module.exports = {};

// Build exports object
OVERRIDES.forEach(function (key) {
    module.exports[key] = null;
});