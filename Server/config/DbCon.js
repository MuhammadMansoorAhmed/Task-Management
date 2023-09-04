
const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/tasks", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB`);
    } catch (err) {
        console.error("Error:", err);
    }
}

module.exports = ConnectDB;