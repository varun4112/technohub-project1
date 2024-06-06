const express = require("express");
const router = new express.Router();
const userController = require("../Controller/userController");
const rbacMiddleware = require("../Middleware/rbac");
const jwtMiddleware = require("../Middleware/jwtMiddleware");
const emailVerification = require("../Controller/emailController");
const phoneController = require("../Controller/phoneController");
// const twilio = require("../Controller/twilio-sms");

// register
router.post("/api/register", userController.register);

// login
router.post("/api/login", userController.login);

// googleLogin
router.post("/api/googleLogin", userController.googleLogin);

// dummAPI for rbac
router.post("/api/dummyRoute", jwtMiddleware, userController.dummy);

router.post("/emailGeneration", emailVerification.sendEmail);

router.post("/emailverification", emailVerification.verifyOtp);

router.put("/em", userController.em);

router.post("/potp", phoneController.sendPhoneOtp);

router.post("/votp", phoneController.verifyOtp);

// //sendOTP api
// router.post("/send-otp",twilio.sendOTP);

// //verifyOTP
// router.post("/verify-otp",twilio.verifyOTP)

module.exports = router;
