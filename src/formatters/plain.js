const valueTypes = [
  {
    check: (value) => value instanceof Object,
    process: () => '[complex value]',
  },
  {
    check: (value) => typeof value === 'boolean',
    process: (value) => value,
  },
  {
    check: (value) => !Number.isNaN(Number(value)),
    process: parseInt,
  },
  {
    check: (value) => typeof value === 'string',
    process: (value) => `'${value}'`,
  },
];

const stringify = (value) => {
  const { process } = valueTypes.find(({ check }) => check(value));
  return process(value);
};

const typeActions = {
  nested: ({ name, value }, parent, fn) => fn(value, `${parent}${name}.`),
  changed: ({ name, value }, parent) => (
    `Property '${parent}${name}' was changed from ${stringify(value.before)} to ${stringify(value.after)}`
  ),
  deleted: ({ name }, parent) => `Property '${parent}${name}' was deleted`,
  added: ({ name, value }, parent) => (
    `Property '${parent}${name}' was added with value: ${stringify(value)}`
  ),
};

const render = (ast, parent = '') => ast
  .filter((node) => typeActions[node.type])
  .map((node) => typeActions[node.type](node, parent, render))
  .join('\n');

export default render;
