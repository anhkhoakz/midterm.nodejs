const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    id: { type: String, unique: true },
    avatar: { type: String },
    name: { type: String },
    email: { type: String },
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
    },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Customer", customerSchema);
