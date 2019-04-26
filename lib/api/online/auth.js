let _session;
const KEY = 'session';

import worldApiFactory from './world-api';

/*
 * Initialise Kano World SDK with auth
 *
 * @param {Function} callback
 * @return void
 */

function formatUser(user) {
    return user;
}

function auth(config) {
    const newSdk = worldApiFactory(config);

    const Session = {
        init() {
            const sessionString = localStorage.getItem(KEY);
            if (!sessionString) {
                return null;
            }
            try {
                _session = JSON.parse(sessionString);
            } catch (e) {
                // Remove item form storage if errors
                localStorage.removeItem(KEY);
                return null;
            }
            return _session;
        },
        save(session) {
            _session = session;
            localStorage.setItem(KEY, JSON.stringify(session));
        },
        clear() {
            _session = null;
            localStorage.removeItem(KEY);
        }
    }

    return {
        checkUsernameAvailability(username) {
            return newSdk.user.checkUsernameAvailability(username);
        },
        register(form) {
            return newSdk.user.register({
                email: form.email,
                username: form.username,
                password: form.password,
                marketing: form.newsletter,
            })
                .then((session) => {
                    newSdk.user.setToken(session.token);
                    Session.save(session);
                    return formatUser(session.user);
                });
        },
        login(username, password) {
            return newSdk.user.login(username, password)
                .then((session) => {
                    newSdk.user.setToken(session.token);
                    Session.save(session);
                    return formatUser(session.user);
                });
        },
        init(callback) {
            const session = Session.init();
            if (session) {
                newSdk.user.setToken(session.token);
                newSdk.user.getById(_session.user.id)
                    .then(user => callback(null, user));
            } else {
                callback();
            }
        },
        logout(reload) {
            Session.clear();
            newSdk.user.logout(reload);
        },
        forgotUsername(email) {
            return newSdk.user.forgotUsername({ email });
        },
        forgotPassword(username) {
            return newSdk.user.forgotPassword({ username });
        }
    };
}

export default auth;
