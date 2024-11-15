const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse json data
app.use(express.json());

// Import routes for users
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
