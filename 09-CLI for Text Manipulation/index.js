const { program } = require("commander");
const { convertText } = require("./textConverter.js");

program
  .version("1.0.0")
  .description(
    "A simple CLI tool to convert text files to uppercase or lowercase"
  );

program
  .command("convert <file> <mode>")
  .description("Convert text file to uppercase or lowercase")
  .action((file, mode) => {
    convertText(file, mode);
  });

program.parse(process.argv);
