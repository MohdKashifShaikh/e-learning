require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
// const img = require("./uploads/imgs")
// const upload = multer({ dest: "./uploads" });
const logger = require("morgan");
const app = express();
const PORT = 4000;
const routing = require("./routes/UserRoute.js");
const routings = require("./routes/TeacherRoutes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001", "http://localhost:4000"],
    // origin: "http://localhost:4000",
  })
);
// app.use(cookieParser());

//----Serving Static Files-----
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://localhost:27017/MERN")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Error in connecting to mongoDB : ", err.toString());
  });

app.use("/api/user", routing);
app.use("/api/teacher", routings);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Not Started!");
  } else {
    console.log("Server Started on PORT : " + PORT);
  }
});
