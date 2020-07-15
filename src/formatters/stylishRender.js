const setIndent = (depth = 0) => '  '.repeat(depth);

const stringify = (data, depth = 0) => {
  if (!(data instanceof Object)) {
    return data;
  }

  const processedData = Object.entries(data).map(([key, value]) => `${key}: ${value}`);

  return `{\n${setIndent(depth + 3)}${processedData}\n${setIndent(depth + 1)}}`;
};

const formatNode = (key, value, symbol = '', depth = 0) =>
  `${setIndent(depth)}${symbol} ${key}: ${stringify(value, depth)}`;

const typeActions = {
  nested: ({ name, children }, depth, func) =>
    `  ${setIndent(depth)}${name}: ${func(children, depth + 2)}`,
  unchanged: ({ name, value }, depth) => formatNode(name, value, ' ', depth),
  changed: ({ name, valueBefore, valueAfter }, depth) => [
    formatNode(name, valueBefore, '-', depth),
    formatNode(name, valueAfter, '+', depth),
  ],
  deleted: ({ name, value }, depth) => formatNode(name, value, '-', depth),
  added: ({ name, value }, depth) => formatNode(name, value, '+', depth),
};

const render = (ast) => {
  const iter = (tree, depth) => {
    const result = tree.flatMap((node) => typeActions[node.type](node, depth, iter)).join('\n');

    return `{\n${result}\n${setIndent(depth - 1)}}`;
  };

  return iter(ast, 1);
};

export default render;
