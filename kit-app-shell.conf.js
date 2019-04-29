// Series of replacements to kill the AMD logic in some 3rd party dependencies
// This will create tautologies that will force rollup to strip modules out and
// make the 3rd party libraries use `window` instead of require/exports/define/global/self
const AMDBuster = {
    'typeof define': `'undefined'`,
    'typeof exports': `'undefined'`,
    'typeof global': `'undefined'`,
    'typeof self': `'undefined'`,
};

/**
 * @type {import('../kit-app-shell/packages/core/types').KashConfig}
 */
module.exports = {
    build: {
        resources: [
            './lib/vendor/ace/**/*',
            './www/assets/**/*',
            './www/css/**/*',
            './www/directive/**/*',
            './www/fonts/**/*',
            './www/js/**/*',
            './www/locales/**/*',
            './www/partial/**/*',
            './www/*.html',
        ],
        replaces: [{
            // Special twemoji module support. Changes the old `var` into a window export
            include: require.resolve('@polymer/polymer/lib/legacy/polymer.dom.js'),
            values: {
                'observerHandle.disconnect();': 'observerHandle && observerHandle.disconnect();',
            },
        }],
    },
    web: {
        port: 4000,
        build: {
            // Target platform for web builds
            targets: {
                chrome: 53,
                ios: 10,
                safari: 10,
            },
        },
    },
    uwp: {},
    test: {},
};
