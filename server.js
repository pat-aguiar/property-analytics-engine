const app = require('./src/app');
const { connectRedis, closeRedisConnection } = require('./src/infra/redisClient');
const port = process.env.PORT || 3000;

let server;

async function startServer() {
    await connectRedis();
    server = app.listen(port, () => {
        console.log(`[Server] Listening on port ${port}`);
    });
    return server;
}

async function stopServer() {
    if (server) {
        await new Promise(resolve => server.close(resolve));
    }
    await closeRedisConnection();
}

if (require.main === module) {
    startServer();
}

module.exports = { app, startServer, stopServer };