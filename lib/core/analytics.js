var config = require('../core/config'),
    analytics = window.analytics;

/*
 * Analytics module
 *
 * Wrapper to Segment.io analytics
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

    analytics.load(config.SEGMENTIO_ID);
};

/*
 * Track current page view
 *
 * @param {String} pageId
 * @return void
 */
exports.page = function (pageId) {
    if (!enabled) { return; }

    analytics.page(pageId);
};