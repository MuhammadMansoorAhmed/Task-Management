const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String 
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
    }]
});

const UsersModel = mongoose.model("users", UsersSchema) 
module.exports = UsersModel;