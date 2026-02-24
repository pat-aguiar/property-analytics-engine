const test = require('node:test');
const { after } = require('node:test'); // Add this import
const assert = require('node:assert');
const request = require('supertest');
const app = require('../../../app');
const { client, connectRedis } = require('../../../infra/redisClient');

test('Property Analytics - POST /api/v1/properties/:id/view', async (t) => {
    // Ensure Redis connection is established before running the test logic
    try {
        await connectRedis();
    } catch (err) {
        assert.fail('Could not connect to Redis. Ensure redis-server is running.');
    }

    const propertyId = 'test-prop-123';
    
    // Simulate a POST request to track a view
    const response = await request(app)
        .post(`/api/v1/properties/${propertyId}/view`)
        .expect(200);

    // Asserting the response structure to ensure delivery quality
    assert.strictEqual(response.body.propertyId, propertyId);
    assert.ok(typeof response.body.totalViews === 'number');

    // Clean up Redis after test to ensure isolation
    await client.del(`property:${propertyId}:views`);
});

// Teardown - Close the Redis connection so the process can exit
after(async () => {
    if (client.isOpen) {
        await client.quit();
        console.log('[Test] Redis connection closed.');
    }
});