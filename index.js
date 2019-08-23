"use strict";
import { Telemetry } from './lib/core/telemetry.js';
import { TelemetryReporter } from './lib/core/reporter.js';
import i18n from './lib/i18n.js';

class MakeArt {
    constructor(kash) {
        const { config } = kash;
        this.root = document.createElement('div');
        this.root.style.opacity = 0;
        this.root.style.transition = 'opacity 200ms linear';
        window.CONFIG = config.CONFIG;
        window.ENV = config.ENV;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${config.UI_ROOT}www/css/main.css`;
        document.head.appendChild(link);
        this.telemetryReporter = new TelemetryReporter(config.TELEMETRY_URL);
        this.telemetryReporter.start(Telemetry);

        config.APP_ROOT = `${config.UI_ROOT}www/`;

        const headerPath = i18n.getHtmlLocalePath(config.APP_ROOT) + '/partial/header.html';
        fetch(headerPath)
            .then(r => r.text())
            .then((h) => {
                const tpl = document.createElement('template');
                tpl.innerHTML = h;
                this.root.appendChild(tpl.content);
                this.root.appendChild(document.createElement('ng-view'));
            })
            .then(() => {
                import('./lib/index.js').then(() => {
                    window.MakeArt.app.constant('_config', config);
                    window.MakeArt.bootstrap(this.root);
                    this.root.style.opacity = 1;
                });
            });
    }
}

Shell.define(MakeArt);
