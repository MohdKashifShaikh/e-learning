const { Schema, model } = require("mongoose");

const cardCourseSchema = new Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    course_price: {
      type: String,
      required: true,
    },
    course_para: {
      type: String,
      required: true,
    },
    course_image: {
      // data: Buffer,
      // contentType: String,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const cardCourseModel = new model("cardCourse", cardCourseSchema);

module.exports = cardCourseModel;
