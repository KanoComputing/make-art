let isSetup = false;
/* eslint import/prefer-default-export: 0 */
export function setupAuth($rootScope, cfg) {
    if (isSetup) {
        return Promise.resolve(window.KanoAuth);
    }
    isSetup = true;

    return new Promise((resolve, reject) => {
        const integration = document.createElement('script');
        integration.src = cfg.AUTH_INTEGRATION_URL;
        integration.addEventListener('load', () => {
            $rootScope.auth.KanoAuth = window.KanoAuth;
            resolve();
        });
        integration.addEventListener('error', () => {
            reject();
        });
        document.head.appendChild(integration);
    });
}
