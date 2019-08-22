import { QueueReporter } from '@kano/telemetry/index.js';

export class TelemetryReporter extends QueueReporter {
    constructor(endpoint) {
        super({
            fireInterval: 5000,
        });
        this.endpoint = endpoint;
    }

    setSessionId(id) {
        this._sessionId = id;
    }

    start(client) {
        super.start(client);
        // Listen to events and update the sessionId when a new session starts
        this._sessionIdSub = client.onDidTrackEvent((event) => {
            if (event.name === 'started_session') {
                this.setSessionId(event.properties.session_id);
            }
        }, this, this._disposables);
    }

    fire(batch) {
        const events = batch.events.map((event) => {
            const properties = {};
            Object.assign(properties, event.properties);
            // Remove duplicate session_id from event properties
            if (event.name === 'started_session' || event.name === 'refreshed_session') {
                delete properties.session_id;
            }
            return JSON.stringify({
                page_path: window.location.pathname,
                scope: event.scope.join('.'),
                name: event.name,
                properties,
                time: Math.round(event.date.getTime() / 1000),
                timezone_offset: event.date.getTimezoneOffset(),
                session_id: this._sessionId,
            });
        });
        const packet = {
            n: 'make-art',
            d: events,
        };
        fetch(`${this.endpoint}`, {
            method: 'PUT',
            body: JSON.stringify(packet),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            return res.text().then((text) => {
                throw new Error(text);
            });
        }).then(() => {
            batch.flush();
        }, () => {
            batch.fail();
        });
    }
}
