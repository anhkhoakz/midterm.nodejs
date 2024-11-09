const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    id: { type: String },
    avatar: { type: String },
    name: { type: String },
    email: { type: String },
    address: {
        city: { type: String },
        state: { type: String },
        country: { type: String },
        street: { type: String },
    },
    phone: { type: String },
    createdAt: { type: Date },
});

module.exports = mongoose.model("Client", clientSchema);
