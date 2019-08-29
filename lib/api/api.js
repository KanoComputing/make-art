import { Client, AccountClient, UserClient, ShareClient } from '@kano/api-client/index.js';
import { session } from './session.js';

const clients = new Map();

export const ClientFactory = (API_URL) => {
    if (!clients.has(API_URL)) {
        const client = new Client({ url: API_URL });

        /* Adding global plugins */
        client.addPlugin(session.plugin);

        const account = new AccountClient(client);
        const share = new ShareClient(client);
        const user = new UserClient(client);

        const api = {
            client,
            account,
            user,
            session,
            share,
        };

        clients.set(API_URL, api);
    }

    return clients.get(API_URL);
};

export default ClientFactory;
