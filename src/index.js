import { program } from 'commander';

const genDiff = () => {
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .parse(process.argv);

  if (!program.args.length) {
    program.help();
  }
};

export default genDiff;
