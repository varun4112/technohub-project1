const phoneSchema = require("../Model/phoneVerification");
const user = require("../Model/userSchema");
const twilio = require("twilio");
require("dotenv").config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendPhoneOtp = async (req, res) => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  try {
    const { phone } = req.body;
    const newPhoneVerification = await new phoneSchema({
      phone,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });
    await newPhoneVerification.save();

    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+16365565715", // Your Twilio phone number
      to: "+918943196722",
    });
    return res.status(200).json("OTP sent successfully");
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json("Error sending OTP");
  }
};

// verify Phone OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { otp, phone } = req.body;
    const existingOtpEntry = await phoneSchema.findOne({
      phone,
      otp,
    });
    console.log(existingOtpEntry);

    if (!existingOtpEntry) {
      return res.status(404).json({ error: "OTP not found" });
    }

    if (existingOtpEntry.expiresAt < Date.now()) {
      return res.status(410).json({ error: "OTP expired" });
    }

    const userRecord = await user.findOne({ phone });
    console.log(userRecord);
    if (!userRecord) {
      return res.status(404).json({ error: "User not found" });
    }

    userRecord.phoneVerification = true;
    const updatedUser = await userRecord.save();

    return res.status(200).json({
      message: "Phone verified successfully",
      user: updatedUser,
      otpVerified: true,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = exports;
