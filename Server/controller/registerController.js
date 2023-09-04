const UsersModel = require("../Model/UsersModel.js");
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const userExist = await UsersModel.findOne({ email: email });
        if (userExist) {
            return res.json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UsersModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.json({ message: "User registration is successful" }); 
    }catch(error){
        console.log(error);
        res.json({message: error})
    }
};

module.exports = { handleRegister };
