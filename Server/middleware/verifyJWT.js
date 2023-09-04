const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; // bearer Token
    jwt.verify(
        token,
        process.env.ACCESS_SECRET_KEY,
        (err, decoded) => { // Add the 'decoded' parameter here to access the decoded payload
            if (err) return res.sendStatus(403);
            req.user = decoded.id; 
            next();
        }
    );
};

module.exports = verifyJWT;
