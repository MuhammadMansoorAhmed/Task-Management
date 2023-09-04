const UsersModel = require('../Model/UsersModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshTokenHandler = async (req, res) => {
    try{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    // console.log(refreshToken);
    const userFound = await UsersModel.findOne({ refreshToken });
    //console.log(userFound);
    if (!userFound) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY,
        (err, decoded) => {
            if (err || userFound.email !== decoded.email) return res.sendStatus(403);

            const accessToken = jwt.sign(
                { email: decoded.email },
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: '15m' }
            )
            res.json({ accessToken })
        }
    )  
    }catch(error){
        res.json("error:" , error)
    }

}

module.exports = { refreshTokenHandler };