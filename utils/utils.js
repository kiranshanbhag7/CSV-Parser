function delimit(string, delimiter) {
  return string.split(delimiter);
}

function replacePipe(string) {
  return string.replace(/\|/g, ',');
}

function log(...texts) {
  const pad = string => '  ' + string;
  const toLog = texts.map(pad).join('\n');
  console.log(toLog);
}

/**
 * Transform each (csv) line. Split by ','. Replace pipe with ','
 *
 * @param {String} line
 * @returns {Array}
 */
function parseLine(line) {
  return delimit(line, ',').map(replacePipe);
}

module.exports = {
  delimit,
  log,
  parseLine,
};
