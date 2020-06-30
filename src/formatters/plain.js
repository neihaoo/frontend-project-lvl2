const stringify = (value) => {
  const processedValue = typeof value === 'string' ? `'${value}'` : value;

  return value instanceof Object ? '[complex value]' : processedValue;
};

const typeActions = {
  nested: ({ name, children }, parent, fn) => fn(children, `${parent}${name}.`),
  changed: ({ name, value }, parent) =>
    `Property '${parent}${name}' was changed from ${stringify(value.before)} to ${stringify(
      value.after
    )}`,
  deleted: ({ name }, parent) => `Property '${parent}${name}' was deleted`,
  added: ({ name, value }, parent) =>
    `Property '${parent}${name}' was added with value: ${stringify(value)}`,
};

const render = (ast, parent = '') =>
  ast
    .filter((node) => typeActions[node.type])
    .map((node) => typeActions[node.type](node, parent, render))
    .join('\n');

export default render;
