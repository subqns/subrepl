#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { homedir } = require('os');

const { clear, flagThrown } = require(path.join(__dirname, 'src', 'utils'));
const { progInfo } = require(path.join(__dirname, 'src', 'format'));
const nodeHelp = require(path.join(__dirname, 'src'));
const args = process.argv.slice(2);

const helpText = `
${chalk.green('subrepl')} [options]

${chalk.blue('Options')}:
  -i, --info        Output Information about node-help and exit
  -u, --update      Manually check for updates to Node.js documentation.
`;

// intercept if help, version or info flags thrown
// checks for 'update' and 'norun' flags are inside init module

if (flagThrown(args, 'help')) {
    console.log(helpText);
    process.exit(0);
}

if (flagThrown(args, 'version')) {
    const pkgJson = fs.readFileSync(path.join(__dirname, '..','package.json'));
    const { version } = JSON.parse(pkgJson);
    console.log(version);
    process.exit(0);
}

if (flagThrown(args, 'info')) {
    const pkgJson = fs.readFileSync(path.join(__dirname, '..','package.json'));
    console.log(progInfo(JSON.parse(pkgJson)));
    process.exit(0);
}

nodeHelp();
