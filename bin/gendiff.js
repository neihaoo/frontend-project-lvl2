#!/usr/bin/env node

import { createRequire } from 'module';
import program from 'commander';
import genDiff from '../index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}

program
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, program.format);

    console.log(diff);
  })
  .parse(process.argv);
