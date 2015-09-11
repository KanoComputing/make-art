/*
 * Config module
 *
 * Central config inclusive of environment sensitive variable parsed
 * from rendered page
 */

module.exports = {
    DEBUG_LEVEL     : 1,
    PRODUCTION      : window.CONFIG ? window.CONFIG.PRODUCTION : false,
    OFFLINE         : window.CONFIG ? window.CONFIG.OFFLINE : false,
    SEGMENTIO_ID    : window.CONFIG ? window.CONFIG.SEGMENTIO_ID : null,
    FACEBOOK_APP_ID : window.CONFIG ? window.CONFIG.FACEBOOK_APP_ID : null,
    MAILSERVER      : window.CONFIG ? window.CONFIG.MAILSERVER : null,
    API_URL         : window.CONFIG ? window.CONFIG.API_URL : null,
    WORLD_URL       : window.CONFIG ? window.CONFIG.WORLD_URL : null,
    TEST_MODE       : window.CONFIG ? window.CONFIG.TEST_MODE : false
};