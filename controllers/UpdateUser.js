const getDetailsFromToken = require("../helper/getDetailsFromToken");
const UserModel = require("../module/UserModel");

async function UpdateUser(req, res) {
  try {
    const token = req.cookies.token || "";

    const user = await getDetailsFromToken(token);

    const { name, profile_pic } = req.body;

    const UpdateUser = await UserModel.updateOne(
      { _id: user?._id },
      {
        name : name,
        profile_pic : profile_pic
      }
    );

    const UserInformation = await UserModel.findById(user._id);

    if (UpdateUser) {
      return res.status(200).json({
        message: "User Updated Successfully",
        data: UserInformation,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = UpdateUser;
