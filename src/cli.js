import { program } from 'commander';
import { readFileSync } from 'fs';
import genJSONDiff from './index';

const getFile = (filename) => readFileSync(filename, 'utf8');

const genDiff = () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      const firstFile = getFile(firstConfig);
      const secondFile = getFile(secondConfig);
      console.log(genJSONDiff(firstFile, secondFile));
    })
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default genDiff;
