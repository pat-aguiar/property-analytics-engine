const { createClient } = require('redis');

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error:', err));

async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
        console.log('[Infra] Connected to Redis');
    }
}

module.exports = { client, connectRedis };