const fs = require("fs");

function convertText(file, mode) {
  if (!fs.existsSync(file)) {
    console.log(`Error: "${file}" does not exists.`);
    return;
  }

  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading file: ", err);
      return;
    }

    let convertedText;
    if (mode == "uppercase") {
      convertText = data.toUpperCase();
    } else if (mode == "lowercase") {
      convertText = data.toLowerCase();
    } else {
      console.log("Error: mode should be uppercase or lowercase");
      return;
    }

    fs.writeFile(file, convertText, (err) => {
      if (err) {
        console.log("Error writing file: ", err);
        return;
      }
      console.log(`Successfully converted file to ${mode}`);
    });
  });
}

module.exports = { convertText };
