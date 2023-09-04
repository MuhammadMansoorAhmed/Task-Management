const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UsersModel = require("../Model/UsersModel.js");
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const userExist = await UsersModel.findOne({ email: email });
    if (!userExist) {
        return res.status(404).send({ Error: "User Not Found" });
    }
    const checkPassword = await bcrypt.compare(password, userExist.password);
    if (!checkPassword) {
        return res.status(401).send({ Error: "Invalid email or password" })
    }
    if (checkPassword) {
        try {
            const accessTokenSecret = process.env.ACCESS_SECRET_KEY;
            const refreshTokenSecret = process.env.REFRESH_SECRET_KEY;

            const accessToken = jwt.sign(
                { email: userExist.email },
                accessTokenSecret,
                { expiresIn: '15m' });

            const refreshToken = jwt.sign(
                { email: userExist.email },
                refreshTokenSecret,
                { expiresIn: '1d' });

            userExist.refreshToken = refreshToken;
            const result = await userExist.save();
            //console.log(result);
            //console.log(refreshToken);

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken, userID: userExist._id });
        } catch (error) {
            res.json(error)
        }
    } else {
        res.sendStatus(401)
    }
}


module.exports = {
    handleLogin
}