import _ from 'lodash';

const propertyTypes = [
  {
    check: (first, second, key) => first[key] instanceof Object && second[key] instanceof Object,
    process: (first, second, key, fn) => ({
      type: 'nested',
      name: key,
      children: fn(first, second),
    }),
  },
  {
    check: (first, second, key) =>
      _.has(first, key) && _.has(second, key) && first[key] === second[key],
    process: (first, second, key) => ({ type: 'unchanged', name: key, value: first }),
  },
  {
    check: (first, second, key) =>
      _.has(first, key) && _.has(second, key) && first[key] !== second[key],
    process: (first, second, key) => ({
      type: 'changed',
      name: key,
      value: { before: first, after: second },
    }),
  },
  {
    check: (first, second, key) => _.has(first, key) && !_.has(second, key),
    process: (first, second, key) => ({ type: 'deleted', name: key, value: first }),
  },
  {
    check: (first, second, key) => !_.has(first, key) && _.has(second, key),
    process: (first, second, key) => ({ type: 'added', name: key, value: second }),
  },
];

const buildAst = (firstConfig, secondConfig) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return configsKeys.map((key) => {
    const { process } = propertyTypes.find(({ check }) => check(firstConfig, secondConfig, key));

    return process(firstConfig[key], secondConfig[key], key, buildAst);
  });
};

export default buildAst;
