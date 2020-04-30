import { program } from 'commander';
import genJSONDiff from './index';

const genDiff = () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genJSONDiff(firstConfig, secondConfig));
    })
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default genDiff;
