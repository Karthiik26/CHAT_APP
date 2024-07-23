const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Provide Name"]
    },
    email : {
        type : String,
        required : [true, "Provide Email"],
        unique : true
    },
    phone : {
        type : Number,
        required : [true, "Provide Number"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Provide Password"]
    },
    profile_pic : {
        type : String,
        default : ""
    }

},{
    timestamps : true
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel