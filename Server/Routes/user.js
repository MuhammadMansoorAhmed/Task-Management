const express = require('express');
const userRoute = express.Router();
const userController = require('../controller/userController');


userRoute.get('/',userController.getUser);



module.exports = userRoute;