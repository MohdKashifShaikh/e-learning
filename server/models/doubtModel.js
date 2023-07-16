const { Schema, model } = require("mongoose");

const doubtSchema = new Schema({
  course_name: {
    type: String,
    required: true,
  },
  doubts: {
    type: String,
    required: true,
  },
  users: {},
});

const doubtModel = new model("doubt", doubtSchema);
module.exports = doubtModel;
