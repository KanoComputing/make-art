var config = require('./config'),
    analytics = window.analytics;

/*
 * Analytics module
 *
 * Wrapper to Segment.io analytics
 * More documentation at: https://segment.com/docs/libraries/analytics.js
 */

var enabled = config.SEGMENTIO_ID && !config.OFFLINE && analytics;

/*
 * Initialise Segment.io if `SEGMENTIO_ID` is present in config, start
 * tracking page views
 *
 * @return void
 */
exports.init = function () {
    if (!enabled) { return; }

    window.analytics.load(config.SEGMENTIO_ID);
};

/*
 * Track current page view
 *
 * @param {String} pageId
 * @return void
 */
exports.page = function (pageId) {
    if (!enabled) { return; }

    window.analytics.page(pageId);
};

/*
 * Tie a user to the tracked data
 *
 *
 * @param {String}   [userId]   - The database ID for the user. If as yet
 *                                unknown, you can omit and just record traits
 * @param {Object}   [traits]   - Dictionary of known traits of the user, e.g.
 *                                email or name
 * @param {Object}   [options]  - Dictionary to enable or disable specific
 *                                integrations for the call
 * @param {Function} [callback] - Callback called after a short timeout
 * @return void
 */
exports.identify = function (userId, traits, options, callback) {
    if (!enabled) { return; }

    window.analytics.identify(userId, traits, options, callback);
};

/*
 * Record actions that a user performs
 *
 * @param {String}   event        - Tracked event name, e.g. 'Added to Cart'
 * @param {Object}   [properties] - Dictionary of event properties, e.g. price,
 *                                  productType, etc.
 * @param {Object}   [options]    - Dictionary to enable or disable specific
 *                                  integrations for the call
 * @param {Function} [callback]   - Callback called after a short timeout
 * @return void
 */
exports.track = function (event, properties, options, callback) {
    if (!enabled) { return; }

    window.analytics.track(event, properties, options, callback);
};
