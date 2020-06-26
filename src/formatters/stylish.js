const indent = (depth = 0) => '  '.repeat(depth);

const objToString = (obj) => (
  Object.entries(obj).map(([key, value]) => `${key}: ${value}`)
);

const stringify = (value, depth) => (
  value instanceof Object
    ? `{\n${indent(depth + 3)}${objToString(value)}\n${indent(depth + 1)}}`
    : value
);

const nodeToString = (key, value, symbol = '', depth) => (
  `${indent(depth)}${symbol} ${key}: ${stringify(value, depth)}`
);

const typeActions = {
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

const render = (ast, depth = 1) => {
  const result = ast
    .flatMap((node) => typeActions[node.type](node, depth, render))
    .join('\n');

  return `{\n${result}\n${indent(depth - 1)}}`;
};

export default render;
