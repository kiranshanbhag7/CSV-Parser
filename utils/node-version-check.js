const versionCheck = require('semver');
const chalk = require('chalk');
const { name, engines } = require('../package');
const { log } = require('./utils');

if (!versionCheck.satisfies(process.version, engines.node)) {
    log(`${chalk.bold.blue(name)} is developed on ${chalk.green('ES6+ syntax')}. Please install node version ${chalk.bold.red(engines.node)}`);
    process.exit(1);
}