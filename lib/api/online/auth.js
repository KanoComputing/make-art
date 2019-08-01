import worldApiFactory from './world-api.js';

let _session;
const KEY = 'session';

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
        updateSession(user) {
            newSdk.user.setToken(user.token);
            Session.save(user);
        },
        init(callback) {
            const session = Session.init();
            if (session) {
                newSdk.user.setToken(session.token);
                newSdk.user.getById(_session.id)
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
        },
        getSession() {
            return _session;
        },
    };
}

export default auth;
