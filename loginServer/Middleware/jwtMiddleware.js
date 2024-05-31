const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.payload = jwtResponse.id;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = jwtMiddleware;
