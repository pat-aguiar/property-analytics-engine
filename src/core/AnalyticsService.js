const CircuitBreaker = require('opossum');
const { client } = require('../infra/redisClient');

class AnalyticsService {
    constructor() {
        const options = {
            timeout: 3000, // If the action takes longer than 3s, fail
            errorThresholdPercentage: 50, // Fail if 50% of requests error
            resetTimeout: 10000 // Wait 10s before trying again
        };

        this.breaker = new CircuitBreaker(this.incrementCounter.bind(this), options);
        
        // Fallback: What to do when the circuit is OPEN (Redis is down)
        this.breaker.fallback(() => ({ 
            totalViews: 'N/A', 
            status: 'degraded',
            message: 'Service is temporarily serving stale data'
        }));
    }

    async incrementCounter(propertyId) {
        const key = `property:${propertyId}:views`;
        return await client.incr(key);
    }

    async trackView(propertyId) {
        // Execute through the breaker to ensure fault tolerance
        const result = await this.breaker.fire(propertyId);
        
        // Buffer Logic (Simulated SQL Sync)
        if (typeof result === 'number' && result % 5 === 0) {
            console.log(`[Database] Batch persisting view #${result} for ${propertyId}`);
        }

        return result;
    }
}

module.exports = new AnalyticsService();