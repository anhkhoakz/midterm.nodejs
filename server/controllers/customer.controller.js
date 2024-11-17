const Customer = require("../models/customer");
const uuid = require("uuid");

const getCustomers = async (req, res) => {
    try {
        const clients = await Customer.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCustomer = async (req, res) => {
    try {
        const client = await Customer.findById(req.params.id);
        res.status(200).json(client);
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

        await Customer.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        res.status(200).json(client);
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
