const { client } = require('../infra/redisClient');

class AnalyticsService {
    async trackView(propertyId) {
        const key = `property:${propertyId}:views`;
        
        // 1. Atomic increment in Redis (Scalability)
        const currentViews = await client.incr(key);

        // 2. Buffer Logic: Sync to "SQL" every 5 views (Simulation)
        if (currentViews % 5 === 0) {
            await this.persistToMainDatabase(propertyId, currentViews);
        }

        return currentViews;
    }

    async persistToMainDatabase(id, total) {
        // This simulates primary database write (Database Evolution)
        console.log(`[Database] Persisting batch: Property ${id} now has ${total} views.`);
    }
}

module.exports = new AnalyticsService();