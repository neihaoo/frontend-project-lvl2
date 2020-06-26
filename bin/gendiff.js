#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.5.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
