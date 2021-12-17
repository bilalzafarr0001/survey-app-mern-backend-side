const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveyModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  designation: { type: String, required: true },
  country: { type: String, required: true },
  age: { type: Number, required: true },
  techstack: { type: String, required: true },
  gender: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("survey", surveyModel);
