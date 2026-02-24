const CircuitBreaker = require('opossum');
const { client } = require('../infra/redisClient');
const logger = require('../infra/logger'); // Import logger

class AnalyticsService {
    constructor() {
        const options = { timeout: 3000, errorThresholdPercentage: 50, resetTimeout: 10000 };
        this.breaker = new CircuitBreaker(this.incrementCounter.bind(this), options);
        
        // Performance Tracking & Observability
        this.breaker.on('fallback', (result) => logger.warn('Circuit Breaker Fallback Triggered', { result }));
        this.breaker.on('open', () => logger.error('Circuit Breaker OPEN: Redis is failing'));
        this.breaker.on('halfOpen', () => logger.info('Circuit Breaker HALF_OPEN: Testing Redis recovery'));
        this.breaker.on('close', () => logger.info('Circuit Breaker CLOSED: Redis is healthy'));

        this.breaker.fallback(() => ({ totalViews: 'N/A', status: 'degraded' }));
    }

    async incrementCounter(propertyId) {
        const start = performance.now(); // Performance tracking
        const key = `property:${propertyId}:views`;
        const result = await client.incr(key);
        const duration = performance.now() - start;

        logger.info('Redis Increment Successful', { propertyId, duration: `${duration.toFixed(2)}ms` });
        return result;
    }

    async trackView(propertyId) {
        return await this.breaker.fire(propertyId);
    }
}

module.exports = new AnalyticsService();