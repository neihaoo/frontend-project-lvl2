import _ from 'lodash';

const propertyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (
      (first[key] instanceof Object && second[key] instanceof Object)
      && !(Array.isArray(first[key]) && Array.isArray(second[key]))
    ),
    process: (first, second, fn) => fn(first, second),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key))
      && (first[key] === second[key]),
    process: _.identity,
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key))
      && (first[key] !== second[key]),
    process: (first, second) => ({ before: first, after: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: _.identity,
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => second,
  },
];

const buildAst = (firstConfig, secondConfig) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return configsKeys.map((key) => {
    const { type, process } = propertyTypes
      .find(({ check }) => check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], buildAst);

    return { type, name: key, value };
  });
};

export default buildAst;
