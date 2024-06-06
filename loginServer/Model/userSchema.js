const mongoose = require("mongoose");
const emailVerification = require("./emailVerification");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
  },
  profilePic: {
    type: String,
    default: "",
  },
  emailVerification: {
    type: Boolean,
    default: false,
  },
  phoneVerification: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", userSchema);
module.exports.users;
