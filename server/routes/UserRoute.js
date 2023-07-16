const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../models/userSchema.js");
const courseModel = require("../models/courseModel.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/allUsers", async (req, res) => {
  const arr = await userModel.find().populate("mycourses");
  res.send(arr);
  // console.log(arr);
});

router.get("/allCourses", async (req, res) => {
  const arr = await courseModel.find();
  res.send(arr);
});

// -------------------------------------- User Registration --------------------------

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  console.log(name);
  const user = new userModel({
    name: name,
    email: email,
    username: username,
    password: password,
    // mycourses: [],
  });
  try {
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      // return
      // res.status(422).json({ error: "Email already exist!!!" })
      console.log("This Email Already exist!!!!");
      res.send(422, "Email already exists!!!!!!!!");
    } else {
      const addedUser = await user.save();
      // res.send(`User Registered Successfully!!! : ${addedUser._id}`);
      res.send(addedUser);
      console.log("User Registered Successfully!!!");
    }
  } catch (err) {
    console.log("Error : ", err.toString());
  }
});
// -------------------------------------- User Login --------------------------

router.post("/login", async (req, res) => {
  const { _email, _password } = req.body;
  try {
    const userLogin = await userModel.findOne({ email: _email });
    if (!userLogin) {
      res.status(401).json({ success: false, error: "No User Found!" });
      console.log("No User Found!!!");
      return;
    }
    // console.log(_password, userLogin.password);
    const unhashed = userLogin.password;
    const comparePass = await bcrypt.compare(_password, unhashed);
    if (!comparePass) {
      res.status(401).json({ success: false, error: "Invalid Credentials!" });
      console.log("Login Failed");
      return;
    }
    // --------------Generate JWT And Sent to client as http only cookie---------------
    else {
      console.log("Login Successfull!!!");
      const token = jwt.sign({ _id: userLogin._id }, process.env.SECRET_KEY);

      const expireTime = new Date();
      expireTime.setDate(expireTime.getDate() + 5);
      // millisecond-120000

      res.cookie("userToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 600000),
      });
      res.status(200).json({ message: "User logged in!", data: userLogin });
      // res.json(userLogin);
    }
  } catch (error) {
    console.log("Error in Login: " + error.toString());
    res.status(500).json({ error: error.toString() });
  }
});
// -------------------------------------- Update User --------------------------

router.post("/update", authenticate, async (req, res) => {
  // console.log(req.body);
  const { name, email, username, password } = req.body;
  // const userS = await userModel.findOne({ _id: req.userID });
  const salt = await bcrypt.genSalt(13);
  const _password = await bcrypt.hash(password, salt);
  try {
    const existUser = await userModel.findOne({ _id: req.userID });
    // console.log(existUser._id);
    // console.log(req.userID);
    if (existUser) {
      const result = await userModel.updateOne({
        $set: {
          name: name,
          email: email,
          username: username,
          password: _password,
        },
      });
      res.status(204).json({ message: "Updated Successfully!", data: result });
    }
    // console.log(updateUser);
    console.log("User Updated Successfully!!!");
  } catch (err) {
    console.log("Error in updating : " + err.toString());
  }
});
// -------------------------------------- Forgot Password --------------------------

router.post("/sendOtp", async (req, res) => {
  const { _email } = req.body;
  console.log(_email);
  // res.send(_email);
  // const resetEmail = new
  try {
    const foundUser = await userModel.findOne({ email: _email });

    // console.log(foundUser);
    if (foundUser) {
      const code = Math.floor(100000 + Math.random() * 900000);
      foundUser.otp = code;
      await foundUser.save();

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "arnoldtest786@gmail.com",
          pass: "test@786123",
        },
      });

      var mailOptions = {
        from: "arnoldtest786@gmail.com",
        to: _email,
        subject: "Sending code using Node JS",
        html: `<h1>Verification Code is : ${code} </h1>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error is : " + error.toString());
        } else {
          // alert("dsdf");
          console.log("Email sent successfully: " + info.response);
        }
      });
    } else {
      console.log("User does not exists");
    }
  } catch (error) {
    console.log(error.toString());
  }
});

// -------------------------------------- Verify OTP --------------------------

router.post("/verify-otp", async (req, res) => {
  const { _otp, _email } = req.body;

  try {
    const foundUser = await userModel.findOne({ email: _email });

    if (foundUser) {
      if (Number(foundUser.otp) === Number(_otp)) {
        foundUser.otp = null;
        await foundUser.save();

        res.status(200).json({ message: "OTP Matched!" });
      } else {
        res.status(400).json({ message: "OTP Not Matched!!!" });
      }
    } else {
      res.status(400).json({ message: "User not exists!!!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!!" });
  }
});

// -------------------------------------- Reset Password --------------------------

router.post("/reset-password", async (req, res) => {
  const { _password, _email } = req.body;

  try {
    const foundUser = await userModel.findOne({ email: _email });

    if (foundUser) {
      foundUser.password = _password;
      await foundUser.save();
      res.status(200).json({ message: "Password Updated!" });
    } else {
      res.status(400).json({ message: "User not exists!!!" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong!!" });
  }
});

// -------------------------------------- My CART --------------------------

router.post("/mycart", authenticate, async (req, res) => {
  const { c_id, c_name, c_price } = req.body;
  const userName = req.rootUser;
  // console.log(req.rootUser);
  // console.log(`c_id: ${c_id}, c_name:${c_name}, c_price: ${c_price}`);
  // console.log(req.userID);
  try {
    const myCourses = new courseModel({
      course_id: c_id,
      course_name: c_name,
      course_price: c_price,
    });
    const addedCourse = await myCourses.save();
    await userModel.updateOne(
      { _id: req.userID },
      { $addToSet: { mycourses: addedCourse._id } }
    );
    // res.json(addedCourse);
    console.log("Course Added successfully!!!");
    // console.log(addedCourse);
    res.status(200).json({
      message: "Course Added success!!!",
      data1: addedCourse,
      data2: userName,
    });
    // if (!req.token) {
    //   res.status(401).json({ error: "Login Error" });
    // }
  } catch (err) {
    res.status(401).json({ error: err.toString() });
    console.log("Error in Adding Course:" + err.toString());
  }
});

router.post("/buy-course", authenticate, async (req, res) => {
  console.log("Buy Now ?");
});

// -------------------------------------- Logout --------------------------

router.post("/logout", (req, res) => {
  try {
    res.cookie("userToken", "", { expires: new Date(0) });
    res.status(200).json({ msg: "Logout!!!" });
    console.log("Logout Successfully!");
  } catch (err) {
    console.log("Error in logout :" + err.toString());
  }
});

// -------------------------------------- User Deletion --------------------------
router.post("/delete/", async (req, res) => {
  // console.log(" " + req.userID);.
  const { id } = req.body;

  const deleteUser = await userModel.findOne({ _id: id });
  if (!deleteUser) {
    res.status(401).json({ message: "User Not Found!!!" });
    console.log("User Not Found!!!");
  } else {
    await deleteUser.remove();
    res.status(202).json({ message: "User Deleted Successfully!" });
    console.log("User Deleted Successfully!");
  }
});

module.exports = router;

// if (userExist && (await userLogin.matchPassword(_password)))
// {
//     res.status(200).json(
//         {
//             message: "User logged in!"
//         });
//     console.log("Login Success");
// }
// else
// {
//     console.log('error')
//     throw new Error('Invalid Credentials!!!')
// }
/* ----------------------------IsLoggedIn------------------------ */
router.post("/loggedin", (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.send(false);
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) {
      return res.send(false);
    }
    res.send(true);
  } catch (error) {
    console.log("Loggedin Error : ", error.message);
    res.send(false);
  }
});
