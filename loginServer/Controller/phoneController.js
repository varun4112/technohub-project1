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

    await phoneSchema.deleteMany({ phone });

    const newPhoneVerification = new phoneSchema({
      phone,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });
    await newPhoneVerification.save();

    // Send the OTP using Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+16365565715",
      to: `+91${phone}`,
    });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res
      .status(500)
      .json({ message: "Error sending OTP", error: err.message });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { otp, phone } = req.body;

    const existingOtpEntry = await phoneSchema.findOne({ phone, otp });
    console.log(existingOtpEntry);

    if (!existingOtpEntry) {
      return res.status(404).json({ error: "OTP not found" });
    }

    if (existingOtpEntry.expiresAt < Date.now()) {
      await phoneSchema.deleteMany({ phone, otp });
      return res.status(410).json({ error: "OTP expired" });
    }

    const userRecord = await user.findOne({ phone });

    if (!userRecord) {
      return res.status(404).json({ error: "User not found" });
    }

    userRecord.phoneVerification = true;
    const updatedUser = await userRecord.save();

    await phoneSchema.deleteMany({ phone, otp });

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
