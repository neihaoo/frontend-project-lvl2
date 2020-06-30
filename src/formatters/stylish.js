const indent = (depth = 0) => '  '.repeat(depth);

const formatObject = (obj) => Object.entries(obj).map(([key, value]) => `${key}: ${value}`);

const stringify = (value, depth = 0) =>
  value instanceof Object
    ? `{\n${indent(depth + 3)}${formatObject(value)}\n${indent(depth + 1)}}`
    : value;

const formatNode = (key, value, symbol = '', depth = 0) =>
  `${indent(depth)}${symbol} ${key}: ${stringify(value, depth)}`;

const typeActions = {
  nested: ({ name, children }, depth, fn) =>
    `  ${indent(depth)}${name}: ${fn(children, depth + 2)}`,
  unchanged: ({ name, value }, depth) => formatNode(name, value, ' ', depth),
  changed: ({ name, value }, depth) => [
    formatNode(name, value.before, '-', depth),
    formatNode(name, value.after, '+', depth),
  ],
  deleted: ({ name, value }, depth) => formatNode(name, value, '-', depth),
  added: ({ name, value }, depth) => formatNode(name, value, '+', depth),
};

const render = (ast, depth = 1) => {
  const result = ast.flatMap((node) => typeActions[node.type](node, depth, render)).join('\n');

  return `{\n${result}\n${indent(depth - 1)}}`;
};

export default render;
