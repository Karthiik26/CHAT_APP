const UserModel = require("../module/UserModel");
const bcryptjs = require('bcryptjs')

async function RegisterUser(req, res){
    try {
        const {name , email, password, profile_pic, phone} = req.body;

        const checkEmail = await UserModel.findOne({email})
        const checkPhone = await UserModel.findOne({phone})

        if (checkEmail) {
            return res.status(400).json({
                message : "This Email Already User Exits In Our System",
                error : true
            })
        }

        if (checkPhone) {
            return res.status(400).json({
                message : "This Phone No Already User Exits In Our System",
                error : true
            })
        }

        // Password Hashing
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password: hashPassword,
            profile_pic,
            phone
        }

        const user = new UserModel(payload);
        const usersave = await user.save();

        return res.status(201).json(
            {
                message : "User Created Succesfully",
                data : usersave,
                success:true
            }
        )

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true
        })   
    }
}


module.exports = RegisterUser