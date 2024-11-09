const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully!!!");
    } catch (error) {
        console.error("Connect failure!!!", error);
        process.exit(1);
    }
};

const getDatabaseStatus = () => {
    const status = mongoose.connection.readyState;

    switch (status) {
        case 0:
            return "Disconnected";
        case 1:
            return "Connected";
        case 2:
            return "Connecting";
        case 3:
            return "Disconnecting";
        case 99:
            return "Uninitialized";
        default:
            return "Unknown";
    }
};

mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected!");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB is disconnected!");
});

process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed due to application termination");
        process.exit(0);
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        process.exit(1);
    }
});

module.exports = {
    connectToDatabase,
    getDatabaseStatus,
};
