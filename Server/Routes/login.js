const express = require('express');
const LoginRouter = express.Router();
const loginController = require('../controller/loginController');


LoginRouter.post('/',loginController.handleLogin);

module.exports =  LoginRouter;

