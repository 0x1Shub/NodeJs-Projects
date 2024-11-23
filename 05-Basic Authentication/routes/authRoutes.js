require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

const userFilePath = path.join(__dirname, "../data/users.json");
const SECRET_KEY = process.env.SECRET_KEY;

function readUsers() {
  return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
}

function writeUsers(data) {
  fs.writeFileSync(userFilePath, JSON.stringify(data, null, 2));
}

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is a protected route.`,
  });
});

// Register new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are  required." });
  }

  const users = readUsers();
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), username, password: hasedPassword };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User registered successfully." });
});

// Login & Generate JWT
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are  required." });
  }

  const users = readUsers();

  const user = users.find((user) => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
