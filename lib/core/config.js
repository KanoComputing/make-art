/*
 * Config module
 *
 * Central config inclusive of environment sensitive variable parsed
 * from rendered page
 */
"use strict";
var langSynonyms = require('../language/synonyms');

module.exports = {
    "default": {
        DEBUG_LEVEL     : 1,
        PRODUCTION      : window.CONFIG ? window.CONFIG.PRODUCTION : false,
        OFFLINE         : window.CONFIG ? window.CONFIG.OFFLINE : false,
        SEGMENTIO_ID    : window.CONFIG ? window.CONFIG.SEGMENTIO_ID : null,
        TEST_MODE       : window.CONFIG ? window.CONFIG.TEST_MODE : false,
        FACEBOOK_APP_ID : window.CONFIG ? window.CONFIG.FACEBOOK_APP_ID : false,
        API_URL         : window.CONFIG ? window.CONFIG.API_URL : false,
        WORLD_URL       : window.CONFIG ? window.CONFIG.WORLD_URL : false,
        CHALLENGES_URL  : window.CONFIG ? window.CONFIG.CHALLENGES_URL : false,
        UNKNOWN_USER    : window.CONFIG ? window.CONFIG.UNKNOWN_USER : null,
        DOMAIN_CFG: {
            "hourofcode.kano.me": {
                'mapToWorld': 'pixelhack',
                'hideShares': true
            },
            "csedweek.kano.me": {
                'mapToWorld': 'pixelhack',
                'hideShares': true
            }
        },
        languageSynonyms: langSynonyms
    },
    "development": {
        FACEBOOK_APP_ID : '832712683515218',
        WORLD_URL       : 'http://localhost:5000',
        API_URL         : 'http://localhost:1234',
        UNKNOWN_USER    : 'tanc'
    },
    "staging": {        
        FACEBOOK_APP_ID : '832712683515218',
        API_URL     : 'https://api-staging.kano.me',
        WORLD_URL   : 'https://world-staging.kano.me',
        UNKNOWN_USER    : 'tanc'},
    "production": {        
        FACEBOOK_APP_ID : '832712683515218',
        API_URL     : 'https://api.kano.me',
        WORLD_URL   : 'http://world.kano.me',
        UNKNOWN_USER    : 'tanc'
    }

};
