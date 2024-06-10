const express = require("express");
const router = new express.Router();
const userController = require("../Controller/userController");
// const rbacMiddleware = require("../Middleware/rbac");
const jwtMiddleware = require("../Middleware/jwtMiddleware");
const emailVerification = require("../Controller/emailController");
const phoneController = require("../Controller/phoneController");

// register
router.post("/api/register", userController.register);

// login
router.post("/api/login", userController.login);

// googleLogin
router.post("/api/googleLogin", userController.googleLogin);

// dummAPI for rbac
router.post("/api/dummyRoute", jwtMiddleware, userController.dummy);

// generate email OTP
router.post("/emailGeneration", emailVerification.sendEmail);

// verify Email OTP
router.post("/emailverification", emailVerification.verifyOtp);

// router.put("/em", userController.em);

// Generate Phone OTP
router.post("/generatePhoneOtp", phoneController.sendPhoneOtp);

// Verify Phone OTP
router.post("/phoneVerification", phoneController.verifyOtp);

module.exports = router;
