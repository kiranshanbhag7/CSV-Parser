const chalk = require('chalk');
const argv = require('yargs')
  .command('<input> <output>', "Parse input CSV file and writes JSON formatted strings into file")
  .epilogue('For more information, refer README.md')
  .argv;
const { log } = require('./utils');
const defaultInput = 'input/sample-sheet.csv';
const defaultOutput = 'output/output.json';

let [inputPath, outputFile] = argv._;

if (!inputPath) {
  log(`  No input file specified. Trying ${chalk.blue(defaultInput)}\n`);
  inputPath = defaultInput;
}

if (!outputFile) {
  log(`  No output filename specified. Using ${chalk.blue(defaultOutput)}\n`);
  outputFile = defaultOutput;
}

module.exports = { inputPath, outputFile };
