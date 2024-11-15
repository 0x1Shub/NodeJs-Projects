const express = require("express");

const router = express.Router();

let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// CREATE -> Add a new user

router.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ -> Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// READ -> Get a single user by id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// UPDATE -> Update users details
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id == parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// DELETE -> Remove a user
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex == -1) return res.status(404).send("User not found");

  users.splice(userIndex, 1);
  res.status(204).send("User deleted successfully");
});

module.exports = router;
