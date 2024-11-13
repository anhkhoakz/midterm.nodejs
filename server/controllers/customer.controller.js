const Customer = require("../models/customer");
const uuid = require("uuid");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/uploads");
    },
    filename: (req, file, cb) => {
        const filename = `${uuid.v4()}-${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"), false);
        }
    },
});

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
    upload.single("avatar")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const client = new Customer({
                ...req.body,
                id: uuid.v4(),
                avatar: req.file.filename,
                address: {
                    street: req.body["address.street"],
                    city: req.body["address.city"],
                    state: req.body["address.state"],
                },
            });
            await client.save();
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

async function updateCustomer(req, res) {
    upload.single("avatar")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        try {
            const updateData = {};

            if (req.body.name) updateData.name = req.body.name;
            if (req.body.email) updateData.email = req.body.email;
            if (req.body.phone) updateData.phone = req.body.phone;

            if (
                req.body["address.street"] ||
                req.body["address.city"] ||
                req.body["address.state"]
            ) {
                updateData.address = {};
                if (req.body["address.street"])
                    updateData.address.street = req.body["address.street"];
                if (req.body["address.city"])
                    updateData.address.city = req.body["address.city"];
                if (req.body["address.state"])
                    updateData.address.state = req.body["address.state"];
            }

            if (req.file) {
                const client = await Customer.findById(req.params.id);
                if (client.avatar) {
                    const filePath = path.join(
                        __dirname,
                        "../../public/images/uploads",
                        client.avatar
                    );
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("Failed to delete avatar file:", err);
                        }
                    });
                }
                updateData.avatar = req.file.filename;
            }

            const updatedCustomer = await Customer.findOneAndUpdate(
                { _id: req.params.id },
                { $set: updateData },
                { new: true }
            );

            res.status(200).json(updatedCustomer);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
}

const deleteCustomer = async (req, res) => {
    try {
        const client = await Customer.findById(req.params.id);
        if (client.avatar) {
            const filePath = path.join(
                __dirname,
                "../../public/images/uploads",
                client.avatar
            );
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Failed to delete avatar file:", err);
                }
            });
        }
        await client.deleteOne();
        res.status(200).json(client);
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
