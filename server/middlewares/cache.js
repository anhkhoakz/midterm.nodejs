const { client } = require("../configs/redis.config");

const cache = async (req, res, next) => {
    const key = `customer:${req.params.id || "all"}`;
    try {
        const data = await client.get(key);
        if (data) {
            console.log("Cache hit for key:", key);
            return res.status(200).json(JSON.parse(data));
        }
        console.log("Cache miss for key:", key);
        next();
    } catch (error) {
        console.error("Redis cache error:", error);
        next();
    }
};

module.exports = cache;
