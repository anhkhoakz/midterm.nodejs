const Customer = require("../models/customer");
const uuid = require("uuid");
const redisClient = require("../configs/redis.config");

const getCustomers = async (req, res) => {
    const cacheKey = "customers:list";

    data = await redisClient.get(cacheKey);
    if (data) {
        console.log("Data from cache");
        return res.status(200).json(JSON.parse(data));
    }

    try {
        const clients = await Customer.find();
        console.log("Data from database");
        console.log(clients);
        redisClient.set(cacheKey, JSON.stringify(clients), { EX: 3600 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getCustomer = async (req, res) => {
    const cacheKey = `customers:${req.params.id}`;

    data = await redisClient.get(cacheKey);
    if (data) {
        console.log("Data from cache");
        return res.status(200).json(JSON.parse(data));
    }

    try {
        const clients = await Customer.findById(req.params.id);
        console.log("Data from database");
        // console.log(clients);
        redisClient.set(cacheKey, JSON.stringify(clients), { EX: 3600 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createCustomer = async (req, res) => {
    try {
        const client = new Customer({
            id: uuid.v4(),
            ...req.body,
        });
        await client.save();

        const cacheKey = "customers:list";
        const clients = await Customer.find();
        redisClient.set(cacheKey, JSON.stringify(clients), { EX: 3600 });

        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateCustomer = async (req, res) => {
    try {
        const client = await Customer.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const updatedClient = await Customer.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        // Xóa bộ nhớ đệm
        const cacheKeyList = "customers:list";
        const cacheKeyItem = `customers:${req.params.id}`;
        await redisClient.del(cacheKeyList);
        await redisClient.del(cacheKeyItem);

        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const client = await Customer.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await Customer.findOneAndDelete({ _id: req.params.id });

        // Xóa bộ nhớ đệm
        const cacheKeyList = "customers:list";
        const cacheKeyItem = `customers:${req.params.id}`;
        await redisClient.del(cacheKeyList);
        await redisClient.del(cacheKeyItem);

        res.status(200).json({ message: "Customer has been deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteAllCustomers = async (req, res) => {
    try {
        await Customer.deleteMany();
        res.status(200).json({ message: "All customers have been deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomers,
};
