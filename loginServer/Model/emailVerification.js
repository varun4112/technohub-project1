const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  otp: {
    type: String,
    default: "",
  },
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("emailOTP", emailSchema);
module.exports.emailOTP;
