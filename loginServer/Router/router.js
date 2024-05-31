const express = require("express");
const router = new express.Router();
const userController = require("../Controller/userController");
const rbacMiddleware = require("../Middleware/rbac");
const jwtMiddleware = require("../Middleware/jwtMiddleware");

// register
router.post("/api/register", userController.register);

// login
router.post("/api/login", userController.login);

// googleLogin
router.post("/api/googleLogin", userController.googleLogin);

// dummAPI for rbac
router.post(
  "/api/dummyRoute",
  jwtMiddleware,
  rbacMiddleware,
  userController.dummy
);

module.exports = router;
