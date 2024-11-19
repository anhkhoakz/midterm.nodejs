const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("connect", () => {
    console.log("Connected to Redis!");
});

client.on("error", (err) => {
    console.error("Redis connection error:", err);
});

const connectToRedis = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
    }
};

module.exports = {
    client,
    connectToRedis,
};
