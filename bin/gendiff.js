#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, program.format);

    console.log(diff);
  })
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}
