let isSetup = false;

export function setupAuth($rootScope, api) {
    if (isSetup) {
        return Promise.resolve();
    }
    isSetup = true;
    return import('@kano/kwc-auth/kwc-auth.js')
        .then(() => {
            const LOGIN_CONNECTION_ERROR = 'We can\'t reach the Kano server. Check your internet connection and try again.';
            const REGISTER_CONNECTION_ERROR = LOGIN_CONNECTION_ERROR;
            const el = document.querySelector('kwc-auth');
            el.addEventListener('submit-signup-info', (e) => {
                el.processing = true;
                api.auth.checkUsernameAvailability(e.detail.username)
                    .then((available) => {
                        el.processing = false;
                        if (!available) {
                            el.set('errors.username', 'Username already taken');
                            return;
                        }
                        el.showParents();
                    })
                    .catch((e) => {
                        el.processing = false;
                        el.set('errors.password', REGISTER_CONNECTION_ERROR);
                    });
            });
            el.addEventListener('submit-signup-email', (e) => {
                el.processing = true;
                return api.auth.register(e.detail)
                    .then((user) => {
                        $rootScope.updateUser(user);
                    })                    
                    .then(() => {
                        el.processing = false;
                        el.showDone();
                    })
                    .catch(() => {
                        el.processing = false;
                        el.set('errors.password', REGISTER_CONNECTION_ERROR);
                    });
            });
            el.addEventListener('login', (e) => {
                el.processing = true;
                api.auth.login(e.detail.username, e.detail.password)
                    .then((user) => {
                        el.processing = false;
                        el.reset();
                        $rootScope.auth.closeModal();
                        tracking.dispatchTrackingEvent('loggedInToKanoWorld');
                        tracking.trackVisitType('Logged in');
                        $rootScope.updateUser(user);
                    })
                    .catch((e) => {
                        let message;
                        if (e.status && e.status === 401) {
                            message = 'Username or password not recognised';
                        } else {
                            message = LOGIN_CONNECTION_ERROR;
                        }
                        el.set('errors.password', message);
                        el.processing = false;
                    });
            });
            el.addEventListener('forgot-username', (e) => {
                el.processing = true;
                api.auth.forgotUsername(e.detail)
                    .then(() => {
                        el.processing = false;
                    })
                    .catch((e) => {
                        let message;
                        if (e.status && e.status === 401) {
                            message = 'Email not recognised';
                        } else {
                            message = LOGIN_CONNECTION_ERROR;
                        }
                        el.set('errors.forgotUsername', message);
                        el.processing = false;
                    });
            });
            el.addEventListener('forgot-password', (e) => {
                el.processing = true;
                api.auth.forgotPassword(e.detail)
                    .then(() => {
                        el.processing = false;
                    })
                    .catch((e) => {
                        let message;
                        if (e.status && e.status === 401) {
                            message = 'Username not recognised';
                        } else {
                            message = LOGIN_CONNECTION_ERROR;
                        }
                        el.set('errors.forgotPassword', message);
                        el.processing = false;
                    });
            });
            $rootScope.auth.el = el;
        });
}
