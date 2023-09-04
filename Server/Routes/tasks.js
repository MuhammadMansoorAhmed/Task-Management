const express = require('express');
const taskController = require('../controller/taskController');
const verifyJWT = require('../middleware/verifyJWT');

const TaskRouters = express.Router();

TaskRouters.use(verifyJWT);

// Routes
TaskRouters.post('/',taskController.insertTask)
TaskRouters.put('/:taskId', taskController.updateTask);
TaskRouters.delete('/:taskId', taskController.deleteTask); 
TaskRouters.get('/', taskController.getTask); 
module.exports = TaskRouters;