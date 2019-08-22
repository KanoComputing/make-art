"use strict";
import { Telemetry } from './lib/core/telemetry.js';
import { TelemetryReporter } from './lib/core/reporter.js';

class MakeArt {
    constructor(kash) {
        const { config } = kash;
        this.root = document.createElement('div');
        this.root.appendChild(document.createElement('ng-view'));
        window.CONFIG = config.CONFIG;
        window.ENV = config.ENV;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${config.UI_ROOT}www/css/main.css`;
        document.head.appendChild(link);
        this.telemetryReporter = new TelemetryReporter(config.TELEMETRY_URL);
        this.telemetryReporter.start(Telemetry);
        import('./lib/index.js').then(() => {
            config.APP_ROOT = `${config.UI_ROOT}www/`;
            window.MakeArt.app.constant('_config', config);
            window.MakeArt.bootstrap(this.root);
        });
    }
}

Shell.define(MakeArt);
