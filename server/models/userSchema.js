const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------------------------USER SCHEMA---------------------------------------

const registerSchema = new Schema(
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
    mycourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hash the password before saving to the database

registerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(13);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// -------------------Generate Token-------------------------

registerSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err.toString());
  }
};

const userModel = new model("user", registerSchema);

// ----------------------------------TEACHER SCHEMA---------------------------------------------

module.exports = userModel;
