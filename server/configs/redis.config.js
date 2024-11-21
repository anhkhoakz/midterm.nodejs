const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const client = redis.createClient({
    socket: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT || 6379,
}
});

client.on("connect", () => {
    console.log("Connected to Redis");
});

client.on("error", (err) => {
    console.error("Redis error:", err);
});

module.exports = client;
