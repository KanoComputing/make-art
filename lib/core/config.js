/*
 * Config module
 *
 * Central config inclusive of environment sensitive variable parsed
 * from rendered page
 */
"use strict";
import langSynonyms from '../language/synonyms.js';

export default {
    "default": {
        DEBUG_LEVEL     : 1,
        PRODUCTION      : window.CONFIG ? window.CONFIG.PRODUCTION : false,
        OFFLINE         : window.CONFIG ? window.CONFIG.OFFLINE : false,
        FACEBOOK_APP_ID : window.CONFIG ? window.CONFIG.FACEBOOK_APP_ID : false,
        API_URL         : window.CONFIG ? window.CONFIG.API_URL : false,
        API_URL_V2      : window.CONFIG ? window.CONFIG.API_URL_V2 : false,
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
        DEFAULT_AVATAR  : 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/563890fec4d6960800c721f7/avatar-circle.png',
        languageSynonyms: langSynonyms
    },
    "development": {
        FACEBOOK_APP_ID : '832712683515218',
        WORLD_URL       : 'http://localhost:5000',
        API_URL         : 'http://localhost:1234',
        API_URL_V2      : 'http://localhost:1234',
        "AUTH_INTEGRATION_URL": "https://art.auth.kano.me/integration.js",
        "AUTH_SIGNUP_URL": "https://art.auth.kano.me/index.html?env=staging#signup",
        "AUTH_LOGIN_URL": "https://art.auth.kano.me/index.html?env=staging#login",
        UNKNOWN_USER    : 'tanc'
    },
    "staging": {
        FACEBOOK_APP_ID : '832712683515218',
        API_URL     : 'https://api-staging.kano.me',
        API_URL_V2  : 'https://worldapi.kes.kano.me',
        WORLD_URL   : 'https://world-staging.kano.me',
        "AUTH_INTEGRATION_URL": "https://staging.auth.kano.me/integration.js",
        "AUTH_SIGNUP_URL": "https://staging.auth.kano.me/index.html?env=staging#signup",
        "AUTH_LOGIN_URL": "https://staging.auth.kano.me/index.html?env=staging#login",
        UNKNOWN_USER         : 'tanc'},
    "production": {
        FACEBOOK_APP_ID : '832712683515218',
        API_URL     : 'https://api.kano.me',
        API_URL_V2  : 'https://worldapi.kes.kano.me',
        WORLD_URL   : 'http://world.kano.me',
        "AUTH_INTEGRATION_URL": "https://art.auth.kano.me/integration.js",
        "AUTH_SIGNUP_URL": "https://art.auth.kano.me/index.html?env=production#signup",
        "AUTH_LOGIN_URL": "https://art.auth.kano.me/index.html?env=production#login",
        UNKNOWN_USER    : 'tanc'
    }

};
