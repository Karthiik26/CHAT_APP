const UserModel = require("../module/UserModel");

async function SearchUser(req, res){
    try {
        const { search, loggedInUserId } = req.body;

        const query = new RegExp(search ,"i", "g")

        const user = await UserModel.find({
            "$or" : [
                { name : query },
                { email : query }
            ],
            "_id": { "$ne": loggedInUserId }
        })

        return res.status(201).json(
            {
                message : "Searching User",
                data : user,
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


module.exports = SearchUser