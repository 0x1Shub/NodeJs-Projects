const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix} - ${file.originalname}`);
  },
});

// multer middleware
const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
  });
});

module.exports = router;
