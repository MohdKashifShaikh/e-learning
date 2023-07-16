/* ----------------------------Teacher_Auth----------------- */
const jwt = require("jsonwebtoken");
const teacherModel = require("../models/userSchema.js");

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.teacherToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootTeacher = await teacherModel.findOne({
      _id: verifyToken._id,
    });
    if (!rootTeacher) {
      throw new Error("Teacher Not Found!");
    }
    req.token = token;
    req.rootTeacher = rootTeacher;
    req.teacherID = rootTeacher._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No Token Provided!");
    console.log("Error in verifying Token : " + err.toString());
  }
};

module.exports = Authenticate;
