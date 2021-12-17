const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    },
  },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userModel);
