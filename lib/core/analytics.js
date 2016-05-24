/*
 * Analytics module
 * Currently we are using Google Analytics with Google Tag Manager
*/

/*
 * Initialise start
 * tracking page views
 *
 * @return void
 */
exports.init = function () {
	return;
};

/*
 * Track current page view
 *
 * @param {String} pageId
 * @return void
 */
exports.page = function (pageId) {
    if (!pageId) {
      return;
    }

    dataLayer.push({
	    'event'            : 'virtualPageView',
        'virtualPageTitle' : document.title,
        'virtualPageURL'   : pageId
	});
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
  // Not used - switched to GA
  return;
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
  // Not used - switched to GA
  return;
};
