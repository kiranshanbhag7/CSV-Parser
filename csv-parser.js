const fs = require('fs');
const chalk = require('chalk');
const { log, parseLine, delimit } = require('./utils/utils');
const { inputPath, outputFile } = require('./utils/args');
const { BLOCK, CSV_FORMAT_REGEX } = require('./utils/constants');
require('./utils/node-version-check');

writeJSON(generateJSON());

/**
 * Writes the JSON body into json output file
 *
 * @param jsonBody
 */
function writeJSON(jsonBody) {
    fs.writeFile(outputFile, jsonBody, error => {
        if (error) {
            log(chalk.red('Could not generate JSON'));
            log(error);
        } else {
            log(`Generated JSON ${chalk.green.bold(outputFile)} 🗄`);
        }
    });
}

/**
 * Generates JSON on parsing CSV file
 *
 * @returns {String}
 */
function generateJSON() {
    // Check that the file exists locally
    if (!fs.existsSync(inputPath)) {
        log(chalk.blue(inputPath), 'does not exist');
        log(`Usage: ${chalk.green('csv-parser <input-file> <output-file>')}`);
        process.exit(1);
        return '';
    }

    // Read CSV
    const file = fs.readFileSync(inputPath, 'utf-8');

    // Parse CSV
    const parsed = parseCSV(file);

    // Creating JSON specific to your requirement
    return JSON.stringify({
        data: [{
                title: 'Learn Konkani',
                list: parsed.map((line, index) => processLine(line, index))
        }]
    });
}

/**
 * Split by blocks (1+ new lines) and process
 *
 * @param {String} csv
 * @returns {Array}
 */
function parseCSV(csv) {
    const contents = csv
    // Trim tabs/spaces/carriages, Remove empty line commas (,,,)
        .replace(CSV_FORMAT_REGEX, '')
        // Trim traling new lines
        .trim();

    const blocks = contents.split(BLOCK);

    log(`${chalk.blue(blocks.length, 'sections')} identified ☘️`, '');

    return blocks.map(block => {
        const lines = delimit(block, '\n');
    return lines.map(parseLine);
});
}

/**
 * Processes each line of CSV and maps it into an object
 * @param line
 * @param index
 * @returns {Object}
 */
function processLine(line, index) {
    const [sectionTitle, ...translations] = line;
    const [, sectionName] = sectionTitle;
    const list = translations.map(([, key, translation]) => {
        return {
            key,
            translation
        }
    });
    return {
        name: sectionName,
        list
    }
}
