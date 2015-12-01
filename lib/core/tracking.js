'use strict';

/*
 * Tracking module
 *
 * Centralised tracking module that provides an interface to track event and
 * manages the communication with whatever tracking system is currently in use
 * (At the moment Segment.io)
 *
 * This module provides a unified interface of communicating events that
 * allowed us to easily witch and try out different analytics third-party
 * services and APIs
 *
 * NOTE: The `window.analytics` Object is provided by the Segment.io library
 */
var config = require('./config'),
    analytics = window.analytics || null,
    key = config.SEGMENTIO_ID,
    enabled = key && analytics;

/*
 * Initialise module  Initialise Segment.io with key from the config module
 */
function init() {
    if (!enabled) {
        return;
    }

    analytics.load(key);

}

/*
 * track event with given arguments
 * @param {*..=}
 */
function event() {
    if (!enabled) {
        return;
    }

    analytics.track.apply(analytics, arguments);
}

module.exports = {
    init  : init,
    event : event
};
