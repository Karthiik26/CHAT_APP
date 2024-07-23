const UserModel = require("../module/UserModel");

async function CheckEmailLogin(req, res) {
  try {
    const { email, phone } = req.body;

    const CheckEmail = await UserModel.findOne({ email }).select("-password");
    const CheckPhone = await UserModel.findOne({ phone }).select("-password");

    if (!CheckPhone && !CheckEmail) {
      return res.status(400).json({
        message: "Users Email Phone Is Not Exit",
        error: true,
      });
    }

    if (!CheckEmail) {
      return res.status(400).json({
        message: "Users Email Not Exit",
        error: true,
      });
    }

    if (!CheckPhone) {
      return res.status(400).json({
        message: "Users Phone Not Exit",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Email And Phone Is Verified",
      success: true,
      data: CheckEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message:error.message || error,
      error : true
  })   
  }
}

module.exports = CheckEmailLogin;
