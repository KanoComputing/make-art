/*
 * Config module
 *
 * Central config inclusive of environment sensitive variable parsed
 * from rendered page
 */

module.exports = {
    DEBUG_LEVEL  : 1,
    PRODUCTION   : window.CONFIG ? window.CONFIG.PRODUCTION : false,
    OFFLINE      : window.CONFIG ? window.CONFIG.OFFLINE : false,
    SEGMENTIO_ID : window.CONFIG ? window.CONFIG.SEGMENTIO_ID : null
    };