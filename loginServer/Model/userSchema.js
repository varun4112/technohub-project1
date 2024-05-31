const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
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
});

module.exports = mongoose.model("users", userSchema);
module.exports.users;
