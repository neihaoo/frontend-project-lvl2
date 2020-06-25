import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './src/parsers.js';
import buildAst from './src/buildAst.js';

const indent = (depth = 0) => '  '.repeat(depth);

const objToString = (obj) => (
  Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join('')
);

const stringify = (value, depth) => (
  value instanceof Object
    ? `{\n${indent(depth + 3)}${objToString(value)}\n${indent(depth + 1)}}`
    : value
);

const nodeToString = (key, value, symbol = '', depth) => (
  `${indent(depth)}${symbol} ${key}: ${stringify(value, depth)}`
);

const typesActions = {
  nested: ({ name, value }, depth, fn) => (
    `  ${indent(depth)}${name}: ${fn(value, depth + 2)}`
  ),
  unchanged: ({ name, value }, depth) => nodeToString(name, value, ' ', depth),
  changed: ({ name, value }, depth) => [
    nodeToString(name, value.before, '-', depth),
    nodeToString(name, value.after, '+', depth),
  ],
  deleted: ({ name, value }, depth) => nodeToString(name, value, '-', depth),
  added: ({ name, value }, depth) => nodeToString(name, value, '+', depth),
};

const stylishRender = (ast, depth = 1) => {
  const result = ast
    .flatMap((node) => typesActions[node.type](node, depth, stylishRender))
    .join('\n');

  return `{\n${result}\n${indent(depth - 1)}}`;
};

const formaters = {
  stylish: stylishRender,
};

const render = (ast, format = 'stylish') => formaters[format](ast);

const prepareConfig = (path) => (
  parse(readFileSync(path, 'utf8'), extname(path))
);

export default (firstPath, secondPath, format) => {
  const firstConfig = prepareConfig(firstPath);
  const secondConfig = prepareConfig(secondPath);
  const ast = buildAst(firstConfig, secondConfig);

  return render(ast, format);
};
