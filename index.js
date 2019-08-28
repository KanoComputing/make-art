"use strict";
import { Telemetry } from './lib/core/telemetry.js';
import { TelemetryReporter } from './lib/core/reporter.js';
import i18n from './lib/i18n.js';

const cssText = `
    #main {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    ng-view {
        flex: 1;
    }
    footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .privacy {
        margin-right: 16px;
        background: white;
        padding: 8px;
        color: #414449;
        font-weight: bold;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
`;

class MakeArt {
    constructor(kash) {
        const { config } = kash;
        this.root = document.createElement('div');
        this.root.setAttribute('id', 'main');
        this.root.style.opacity = 0;
        this.root.style.transition = 'opacity 200ms linear';
        this.addStyles();
        window.CONFIG = config.CONFIG;
        window.ENV = config.ENV;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${config.UI_ROOT}www/css/main.css`;
        document.head.appendChild(link);
        this.telemetryReporter = new TelemetryReporter(config.TELEMETRY_URL);
        this.telemetryReporter.start(Telemetry);

        config.APP_ROOT = `${config.UI_ROOT}www/`;

        const footerTpl = document.createElement('template');

        footerTpl.innerHTML = `
            <footer>
                <a class="privacy" href="https://world.kano.me/privacy-policy" target="_blank">Privacy Policy</a>
            </footer>
        `;

        const headerPath = i18n.getHtmlLocalePath(config.APP_ROOT) + '/partial/header.html';
        fetch(headerPath)
            .then(r => r.text())
            .then((h) => {
                const tpl = document.createElement('template');
                tpl.innerHTML = h;
                this.root.appendChild(tpl.content);
                this.root.appendChild(document.createElement('ng-view'));
                this.root.appendChild(footerTpl.content);
            })
            .then(() => {
                import('./lib/index.js').then(() => {
                    window.MakeArt.app.constant('_config', config);
                    window.MakeArt.bootstrap(this.root);
                    this.root.style.opacity = 1;
                });
            });
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = cssText;
        document.head.appendChild(style);
    }
}

Shell.define(MakeArt);
