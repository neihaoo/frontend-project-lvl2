import _ from 'lodash';

const buildAst = (firstConfig, secondConfig) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return configsKeys.map((key) => {
    const firstConfigValue = firstConfig[key];
    const secondConfigValue = secondConfig[key];

    if (firstConfigValue instanceof Object && secondConfigValue instanceof Object) {
      return { type: 'nested', name: key, children: buildAst(firstConfigValue, secondConfigValue) };
    }

    if (_.has(firstConfig, key) && _.has(secondConfig, key)) {
      return firstConfigValue === secondConfigValue
        ? { type: 'unchanged', name: key, value: firstConfigValue }
        : {
            type: 'changed',
            name: key,
            valueBefore: firstConfigValue,
            valueAfter: secondConfigValue,
          };
    }

    return _.has(firstConfig, key) && !_.has(secondConfig, key)
      ? { type: 'deleted', name: key, value: firstConfigValue }
      : { type: 'added', name: key, value: secondConfigValue };
  });
};

export default buildAst;
