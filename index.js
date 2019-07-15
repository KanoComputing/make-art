"use strict";

class MakeArt {
    constructor(bus, config) {
        this.root = document.createElement('div');
        this.root.appendChild(document.createElement('ng-view'));
        window.CONFIG = config.CONFIG;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${config.UI_ROOT}www/css/main.css`;
        document.head.appendChild(link);
        import('./lib/index.js').then(() => {
            config.APP_ROOT = `${config.UI_ROOT}www/`;
            window.MakeArt.app.constant('_config', config);
            window.MakeArt.bootstrap(this.root);
        });
    }    
}

Shell.define(MakeArt);
