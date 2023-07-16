/* ----------------------------User_Auth----------------- */
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema.js");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await userModel.findOne({
      _id: verifyToken._id,
    });
    if (!rootUser) {
      throw new Error("User Not Found!");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No Token Provided!");
    console.log(err.toString());
  }
};

module.exports = Authenticate;
