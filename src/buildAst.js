const { hasOwnProperty } = Object.prototype.hasOwnProperty;
const has = (obj, key) => hasOwnProperty.call(obj, key);

const propertyActions = [
  {
    check: (firstProperty, secondProperty, key) =>
      firstProperty[key] instanceof Object && secondProperty[key] instanceof Object,
    process: (firstPropertyValue, secondPropertyValue, key, func) => ({
      type: 'nested',
      name: key,
      children: func(firstPropertyValue, secondPropertyValue),
    }),
  },
  {
    check: (firstProperty, secondProperty, key) =>
      has(firstProperty, key) &&
      has(secondProperty, key) &&
      firstProperty[key] === secondProperty[key],
    process: (firstPropertyValue, secondPropertyValue, key) => ({
      type: 'unchanged',
      name: key,
      value: firstPropertyValue,
    }),
  },
  {
    check: (firstProperty, secondProperty, key) =>
      has(firstProperty, key) &&
      has(secondProperty, key) &&
      firstProperty[key] !== secondProperty[key],
    process: (firstPropertyValue, secondPropertyValue, key) => ({
      type: 'changed',
      name: key,
      valueBefore: firstPropertyValue,
      valueAfter: secondPropertyValue,
    }),
  },
  {
    check: (firstProperty, secondProperty, key) =>
      has(firstProperty, key) && !has(secondProperty, key),
    process: (firstPropertyValue, secondPropertyValue, key) => ({
      type: 'deleted',
      name: key,
      value: firstPropertyValue,
    }),
  },
  {
    check: (firstProperty, secondProperty, key) =>
      !has(firstProperty, key) && has(secondProperty, key),
    process: (firstPropertyValue, secondPropertyValue, key) => ({
      type: 'added',
      name: key,
      value: secondPropertyValue,
    }),
  },
];

const buildAst = (firstConfig, secondConfig) => {
  const configsKeys = Object.keys({ ...firstConfig, ...secondConfig });

  return configsKeys.map((key) => {
    const { process } = propertyActions.find(({ check }) => check(firstConfig, secondConfig, key));

    return process(firstConfig[key], secondConfig[key], key, buildAst);
  });
};

export default buildAst;
