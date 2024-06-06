const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
  phone: {
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

module.exports = mongoose.model("phoneSchema", phoneSchema);
module.exports.phoneSchema;
