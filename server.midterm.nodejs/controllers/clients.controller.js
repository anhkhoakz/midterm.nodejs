const Client = require("../models/clients");

const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createClient = async (req, res) => {
    const client = new Client(req.body);
    try {
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        client.set(req.body);
        await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        await client.delete();
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
};
