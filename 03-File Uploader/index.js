const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/uploads", express.static("uploads"));

const fileUploadRoutes = require("./routes/fileUpload");
app.use("/api/upload", fileUploadRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
