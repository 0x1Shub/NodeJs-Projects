const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to json file
const filePath = path.join(__dirname, "../data/storage.json");

// Read JSON file
function readJSONFile() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Write JSON file
function writeJSONFile(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET
router.get("/", (req, res) => {
  try {
    const data = readJSONFile();
    res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Error reading data" });
  }
});

// POST
router.post("/", (req, res) => {
  try {
    const newData = req.body;
    const data = readJSONFile();
    const id = Date.now();
    data[id] = newData;
    writeJSONFile(data);
    res.status(201).json({ id, ...newData });
  } catch (err) {
    return res.status(500).json({ error: "Error writind data" });
  }
});

// PUT
router.put("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const data = readJSONFile();

    if (!data[id]) {
      return res.status(404).json({ error: "Data not found" });
    }

    data[id] = updatedData;
    writeJSONFile(data);
    res.json({ id, ...updatedData });
  } catch (err) {
    return res.status(500).json({ error: "Error updating data" });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = readJSONFile();
    if (!data[id]) {
      return res.status(404).json({ error: "Data not found" });
    }

    delete data[id];
    writeJSONFile(data);
    res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Error deleting data" });
  }
});

module.exports = router;
