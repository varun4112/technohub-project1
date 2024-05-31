const user = require("../Model/userSchema");

const rbacMiddleware = async (req, res, next) => {
  try {
    const email = req.body.email;
    const existingUser = await user.findOne({ email });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.role != "admin") {
      console.log("role", existingUser.role);
      return res.status(403).json({ error: "Access Denied" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = rbacMiddleware;
