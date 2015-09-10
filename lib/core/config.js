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
        OFFLINE      : window.CONFIG ? window.CONFIG.OFFLINE : false,
        SEGMENTIO_ID : window.CONFIG ? window.CONFIG.SEGMENTIO_ID : null,
        TEST_MODE    : window.CONFIG ? window.CONFIG.TEST_MODE : false,
    },
    "development": {
        facebookAppId: '832712683515218',
        mailServer: 'http://localhost:7000/summercamp/send',
        WORLD_URL   : 'http://localhost:5000',
        API_URL     : 'http://localhost:1234'
    },
    "staging": {
        facebookAppId: '832606903525796',
        mailServer: 'http://kanofathersday.herokuapp.com/summercamp/send',
        WORLD_URL   : 'http://world-staging.kano.me',
        API_URL     : 'http://api-staging.kano.me'
    },
    "production": {
        facebookAppId: '832606903525796',
        mailServer: 'http://kanofathersday.herokuapp.com/summercamp/send',
        WORLD_URL   : 'http://world.kano.me',
        API_URL     : 'https://api.kano.me'
    }
};