const stringify = (value) => {
  const processedValue = typeof value === 'string' ? `'${value}'` : value;

  return value instanceof Object ? '[complex value]' : processedValue;
};

const typeActions = {
  nested: ({ name, children }, parent, func) => func(children, `${parent}${name}.`),
  changed: ({ name, valueBefore, valueAfter }, parent) =>
    `Property '${parent}${name}' was changed from ${stringify(valueBefore)} to ${stringify(
      valueAfter
    )}`,
  deleted: ({ name }, parent) => `Property '${parent}${name}' was deleted`,
  added: ({ name, value }, parent) =>
    `Property '${parent}${name}' was added with value: ${stringify(value)}`,
};

const render = (ast) => {
  const iter = (tree, parent) =>
    tree
      .filter((node) => typeActions[node.type])
      .map((node) => typeActions[node.type](node, parent, iter))
      .join('\n');

  return iter(ast, '');
};

export default render;
