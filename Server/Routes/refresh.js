const express = require('express')
const refreshRouter = express.Router();
const handleRefreshToken = require('../middleware/handleRefreshToken')

refreshRouter.get('/', handleRefreshToken.refreshTokenHandler);

module.exports = refreshRouter;