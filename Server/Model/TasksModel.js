const mongoose = require("mongoose");

const { Schema } = mongoose;

const TasksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
});



const TaskModel = mongoose.model("task", TasksSchema);
module.exports = TaskModel;