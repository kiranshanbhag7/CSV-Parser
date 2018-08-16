const BLOCK = /\n{2,}/;
const CSV_FORMAT_REGEX = /([\t\r]+)|(^[, \t]+$)/gm;

module.exports = { BLOCK, CSV_FORMAT_REGEX };
