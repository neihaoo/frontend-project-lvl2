import _ from 'lodash';

const buildAst = (firstConfig, secondConfig) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  return configsKeys.map((key) => {
    if (_.has(firstConfig, key) && !_.has(secondConfig, key)) {
      return { type: 'deleted', name: key, value: firstConfig[key] };
    }

    if (!_.has(firstConfig, key) && _.has(secondConfig, key)) {
      return { type: 'added', name: key, value: secondConfig[key] };
    }

    if (firstConfig[key] instanceof Object && secondConfig[key] instanceof Object) {
      return { type: 'nested', name: key, children: buildAst(firstConfig[key], secondConfig[key]) };
    }

    if (firstConfig[key] === secondConfig[key]) {
      return { type: 'unchanged', name: key, value: firstConfig[key] };
    }

    return {
      type: 'changed',
      name: key,
      valueBefore: firstConfig[key],
      valueAfter: secondConfig[key],
    };
  });
};

export default buildAst;
