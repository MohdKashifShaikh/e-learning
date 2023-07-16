const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
    },
    // doubts: {
    //   courseId: Number,
    //   doubtId: Number,
    //   doubt: String,
    //   userId: Number,
    // },
  },
  {
    timestamps: true,
  }
);

teacherSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(13);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
  next();
});

const teacherModel = new model("teacher", teacherSchema);

module.exports = teacherModel;
