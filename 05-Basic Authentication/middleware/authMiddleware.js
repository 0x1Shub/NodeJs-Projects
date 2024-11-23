require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload; // Add user data to the request object
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

module.exports = authenticateToken;
