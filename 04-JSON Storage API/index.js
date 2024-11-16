const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Importing Routes
const jsonRoutes = require("./routes/jsonRoutes");
app.use("/api/data", jsonRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
