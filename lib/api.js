"use strict";

/*
 * API module
 *
 * Exports appropriate core functionality API depending on OFFLINE env variable
 */
import onlineFactory from './api/online/index.js';
import offlineFactory from './api/offline/index.js';
import worldApiFactory from './api/online/world-api.js';

export default function (config) {
    const online = onlineFactory(config);
    const offline = offlineFactory(config);
    const api = config.OFFLINE ? offline : online;

    api.online = worldApiFactory(config);
    return api;
};
