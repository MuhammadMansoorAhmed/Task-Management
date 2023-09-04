const UserModel = require('../Model/UsersModel');


const getUser = async (req, res) => {
    try {
        const userId = req.user;
        const getUser = await UserModel.findOne({ user: userId })
        res.json(getUser._id);
    } catch (error) {
        res.json(error)
    }
}

module.exports = { getUser };