import { sessionPlugin } from './plugins/session.js';

export const session = sessionPlugin({ key: 'session' });
session.reloadSession();

export default session;
