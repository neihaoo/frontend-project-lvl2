import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './src/parsers.js';
import buildAst from './src/buildAst.js';
import render from './src/formatters/index.js';

const prepareConfig = (path) => parse(readFileSync(path, 'utf8'), extname(path).slice(1));

const genDiff = (firstPath, secondPath, format = 'stylish') => {
  const firstConfig = prepareConfig(firstPath);
  const secondConfig = prepareConfig(secondPath);
  const ast = buildAst(firstConfig, secondConfig);

  return render(ast, format);
};

export default genDiff;
