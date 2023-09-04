const TaskModel = require('../Model/TasksModel');


const insertTask = async (req, res) => {
    try {
        const userId = req.user; // Get the authenticated user's ID
        const { title, description, status, priority, dueDate } = req.body;
        const newTask = new TaskModel({
            title, description, status, priority, dueDate,
            user: userId,
        });

        await newTask.save();
        res.json({ message: "Task is added successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
const updateTask = async (req, res) => {
    const { taskId } = req.params; // Corrected parameter name
    const { title, description, status, priority, duedate } = req.body;
    try {
        await TaskModel.findByIdAndUpdate(
            taskId,
            {
                title, description, status, priority, duedate,
            });
        res.json({ message: "Task is updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params; // Corrected parameter name
    try {
        await TaskModel.deleteOne({ _id: taskId }); // Corrected deletion query
        res.json({ message: "Task is Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const getTask = async (req, res) => {
    try {
        const userId = req.user; // Use the authenticated user's ID
        const tasks = await TaskModel.find({ user: userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};



module.exports = {
    getTask,
    deleteTask,
    updateTask,
    insertTask
}