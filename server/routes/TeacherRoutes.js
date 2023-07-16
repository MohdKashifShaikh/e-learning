const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const teacherModel = require("../models/teacherSchema");
const doubtModel = require("../models/doubtModel");
const courseCardModel = require("../models/addCourseCardModel");
const teacherAuthenticate = require("../middleware/authTeacher.js");

router.get("/allTeachers", async (req, res) => {
  const arr = await teacherModel.find();
  res.send(arr);
  console.log(arr);
});
router.get("/allDoubts", async (req, res) => {
  const arr = await doubtModel.find();
  res.status(200).send(arr);
});

// ---------------------------Teacher Registereation------------------------

router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  const teacher = new teacherModel({
    name: name,
    email: email,
    username: username,
    password: password,
  });
  try {
    const teacherExist = await teacherModel.findOne({ email: email });
    if (teacherExist) {
      // return
      // res.status(422).json({ error: "Email already exist!!!" })
      console.log("This Email Already exist!!!!");
      res.send(422, "Email already exists!!!!!!!!");
    } else {
      const addedTeacher = await teacher.save();
      // res.send(`User Registered Successfully!!! : ${addedUser._id}`);
      res.send(addedTeacher);
      console.log("Teacher Registered Successfully!!!");
    }
  } catch (err) {
    console.log("Error : ", err.toString());
  }
});
// ----------------------------------Teacher Login-------------------------

router.post("/login", async (req, res) => {
  const { _email, _password } = req.body;
  try {
    const teacherLogin = await teacherModel.findOne({ email: _email });
    const unHashed = teacherLogin.password;
    const matchPassword = await bcrypt.compare(_password, unHashed);

    if (teacherLogin) {
      console.log("Exists");
      if (matchPassword) {
        console.log("Login success!!!");

        const token = jwt.sign({ _id: teacherLogin._id }, process.env.SECRET_KEY);
        const expireTime = new Date();
        expireTime.setDate(expireTime.getDate() + 5);
        // millisecond-120000

        res.cookie("teacherToken", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 300000),
        });

        res.status(200).json({ message: "Teacher logged in!", data: teacherLogin });
      } else {
        res.status(401).json({ message: "Invalid Credentials!" });
        console.log("Login Failed!!");
      }
    } else {
      console.log("Teacher does not Exists!!!");
    }
  } catch (err) {
    console.log("Error in Login : " + err.stack);
  }
});

// ---------------------------------DOUBT ROUTES---------------------------
router.post("/doubt", async (req, res) => {
  const { course_name, doubts, userDataArray } = req.body;
  // const buyedUserData = req.body;

  // ------------------------------------------------------USER DATA HERE--------------------------------------------------------------

  console.log(userDataArray);
  try {
    const addedDoubts = new doubtModel({ course_name, doubts });
    const data = await addedDoubts.save();
    res.status(200).json({
      message: "Doubts Submitted!!!",
      data1: data,
      data2: userDataArray,
    });
  } catch (err) {
    console.log("Error in doubts!!!" + err.toString());
  }
});

// ---------------------------------MULTER------------------------------

// router.post("/add-course", upload.single("img"), async (req, res) => {
// res.send("Upload Success!!!");
// const { name, price, para } = req.body;
// const { image } = req.file.filename;
// console.log(req.file.filename);
// try {
// console.log(image_);
// if (cimage === undefined) {
// console.log("upload file not found!");
// } else {
// console.log(name, price, para);
// console.log(image);
// res.status(200).json({ msg: "Undefined File!", data: image });
// }
// res.status(200).json({ msg: "Undefined File!", data: image });
// const image_ = req.file.filename;
// console.log("Image_Name : " + image_);
// } catch (err) {
//   console.log("Error in try : " + err.toString());
// }
// // const { name, price, para, image } = req.body;
// // console.log(name, price, para, image);
// });
/* MULTER DONE HERE*/

const storage = multer.diskStorage({
  // destination for files
  destination: function (req, file, callback) {
    console.log("Something!!!");
    console.log(file);
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    // callback(null, Date.now() + "-" + file.originalname);
    callback(null, file.originalname);
  },
});
// const upload = multer({
//   storage: storage,
// });

router.post(
  "/add-course",
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    // console.log(req.body);
    // console.log("File:-" + req.file.filename);
    const cardCourse_ = new courseCardModel({
      // _id: new ObjectId(),
      course_name: req.body.name,
      course_price: req.body.price,
      course_para: req.body.para,
      course_image: req.file.filename,
    });
    try {
      const addedCardCourse = await cardCourse_.save();
      // console.log(addedCardCourse);
      res
        .status(200)
        .json({ msg: "Course Card created Successfully!", data: addedCardCourse });
    } catch (err) {
      console.log("Error in creating/uploading courses!" + err.toString());
    }
  }
);

router.get("/showCourses", async (req, res) => {
  const displayAll = await courseCardModel.find({});
  res.json(displayAll);
  console.log(displayAll);
});

module.exports = router;
