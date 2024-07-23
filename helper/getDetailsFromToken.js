const jwt = require("jsonwebtoken");
const UserModel = require("../module/UserModel");

const getDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY);
  const user = await UserModel.findById(decode.id);

  return user;
};

module.exports = getDetailsFromToken;
