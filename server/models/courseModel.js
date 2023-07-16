const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    course_id: {
      type: String,
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
    course_price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel = new model("courses", courseSchema);

module.exports = CourseModel;
