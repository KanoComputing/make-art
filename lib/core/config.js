/*
 * Config module
 *
 * Central config inclusive of environment sensitive variable parsed
 * from rendered page
 */

module.exports = {
    "default": {
        DEBUG_LEVEL  : 1,
        PRODUCTION   : window.CONFIG ? window.CONFIG.PRODUCTION : false,
        STAGING      : window.CONFIG ? window.CONFIG.STAGING : false,
        OFFLINE      : window.CONFIG ? window.CONFIG.OFFLINE : false,
        SEGMENTIO_ID : window.CONFIG ? window.CONFIG.SEGMENTIO_ID : null,
        TEST_MODE    : window.CONFIG ? window.CONFIG.TEST_MODE : false,
    },
    "development": {
        facebookAppId: '832712683515218',
        mailServer: 'http://localhost:7000/summercamp/send'
    },
    "staging": {
        facebookAppId: '832606903525796',
        mailServer: 'http://kanofathersday.herokuapp.com/summercamp/send'
    },
    "production": {
        facebookAppId: '832606903525796',
        mailServer: 'http://kanofathersday.herokuapp.com/summercamp/send'
    }
};