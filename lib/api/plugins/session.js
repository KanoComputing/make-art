const DEFAULT_OPTIONS = {
    key: 'session',
};

export function sessionPlugin(opts = {}) {
    const options = Object.assign({}, DEFAULT_OPTIONS, opts);
    let session;

    function updateSession(data) {
        session = data;
        localStorage.setItem(options.key, JSON.stringify(data));
    }    

    return {
        reloadSession() {
            const sessionString = localStorage.getItem(options.key);
            if (sessionString) {
                try {
                    session = JSON.parse(sessionString);
                } catch (e) { /* ignore */ }
            }
        },
        getSession() {
            return session;
        },
        logout() {
            session = null;
            localStorage.removeItem(options.key);
        },
        updateSession(d) {
            updateSession(d);
        },
        plugin: {
            beforeFetch(endpoint) {
                if (session && endpoint.headers.get('Authorization') === null) {
                    endpoint.headers.append('Authorization', `Bearer ${session.token}`);
                }
                return Promise.resolve(endpoint);
            },
        },
    };
}

export default sessionPlugin;
