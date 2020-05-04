import { program } from 'commander';
import genDiff from './index';

const cliGenDiff = () => {
  program
    .version('1.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig));
    })
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default cliGenDiff;
