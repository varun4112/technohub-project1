const emailSchema = require("../Model/emailVerification");
const user = require("../Model/userSchema");
require("dotenv").config();
const nodemailer = require("nodemailer");

//create Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS,
  },
});

// sendEmail
exports.sendEmail = async (req, res) => {
  const otp = Math.floor(Math.random() * 900000) + 100000;
  try {
    const { email, _id } = req.body;
    
    const mailOptions = {
      from: {
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Email Verification",
      text: "Your verification OTP",
      html: ` <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #007BFF; color: #ffffff; padding: 10px; border-radius: 8px 8px 0 0; text-align: center;">
      <h1 style="margin: 0;">OTP Verification</h1>
    </div>
    <div style="padding: 20px; line-height: 1.6;">
      <p>Dear User,</p>
      <p>Your One-Time Password (OTP) for verifying your email address is:</p>
      <h2 style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">${otp}</h2>
      <p>Please enter this OTP to complete your email verification. This OTP is valid for <b>5 MINUTES</b>.</p>
      <p>Best regards</p>
    </div>
    
  </div>`,
    };

    await emailSchema.deleteMany({ email });

    const newVerification = await new emailSchema({
      userId: _id,
      email,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });

    await newVerification.save();
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json("Email Sent Successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json("Error sending email");
  }
};

// verify otp
exports.verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const existingUser = await emailSchema.findOne({ email, otp });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.expiresAt < Date.now()) {
      return res.status(410).json({ error: "OTP expired" });
    }

    const userd = await user.findOne({ email });
    if (!userd) {
      return res.status(404).json({ error: "User not found" });
    }

    userd.emailVerification = true;
    const updatedUser = await userd.save();
    await emailSchema.deleteMany({ email });

    return res.status(200).json({
      message: "Email verified successfully",
      user: updatedUser,
      otpVerified: true,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = exports;
