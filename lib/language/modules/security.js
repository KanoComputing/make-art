/*
 * Security module
 *
 * Override core objects in the language scope to evaluate in a secured scope
 */

var OVERRIDES = [
    'window',
    'top',
    'Window',
    'Document',
    'document',
    'console',
    'alert',
    'addEventListener',
    'removeEventListener',
    'releaseEvents',
    'localStorage',
    'KW_SDK',
    'angular',
    'app',
    '$',
    'open',
    'location',
    'parent',
    'postMessage',
    'print',
    'profile',
    'prompt',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'scroll',
    'scrollBy',
    'scrollTo',
    'scrollX',
    'scrollY',
    'session',
    'sessionStorage',
    'setTimeout',
    'setInterval'
];

module.exports = {};

// Build exports object
OVERRIDES.forEach(function (key) {
    module.exports[key] = null;
});
