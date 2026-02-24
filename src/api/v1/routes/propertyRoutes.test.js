const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest'); // Used only to trigger the HTTP calls in tests
const { app, startServer, stopServer } = require('../../../../server');

test.before(async () => {
    await startServer();
});

test('GET /api/v1/properties - success case', async (t) => {
    const response = await request(app).get('/api/v1/properties');

    // Asserting the "Guardian" mindset: Versioning is present
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.version, 'v1');
    assert.strictEqual(response.body.status, 'active');
});

test.after(async () => {
    await stopServer();
});

