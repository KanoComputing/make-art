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
    SEGMENTIO_ID : window.CONFIG ? window.CONFIG.SEGMENTIO_ID : null,
    TEST_MODE    : window.CONFIG ? window.CONFIG.TEST_MODE : false,
    facebookAppId: '832606903525796',
    testingAppId : '832712683515218',
    mailCfg			 : {
    	urls			 : {
	    	development : 'http://localhost:7000/summercamp/send',
	    	production 	: 'http://kanofathersday.herokuapp.com/summercamp/send'
	    }
    }
 };