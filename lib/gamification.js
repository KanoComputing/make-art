import { GamificationClient } from '@kano/api-client/index.js';
import { GamificationFallbackPlugin } from '@kano/api-client/plugins/gamification-fallback.js';

export function prepareGamification(client, userId, anonId) {
    const gamification = new GamificationClient(client);
    const offlinePlugin = new GamificationFallbackPlugin(userId, anonId);
    
    gamification.addPlugin(offlinePlugin);
    
    return offlinePlugin.prepare().then(() => {
        return gamification;
    });
}
