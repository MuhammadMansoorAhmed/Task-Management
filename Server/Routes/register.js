const registerController = require('../controller/registerController')
const express = require('express');
const RegisterRouter = express.Router();


RegisterRouter.post('/', registerController.handleRegister);

module.exports = RegisterRouter;