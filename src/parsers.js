import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (value) => !Number.isNaN(Number(value));

const valueActions = [
  {
    check: (value) => value instanceof Object,
    process: (value, func) => func(value),
  },
  {
    check: (value) => typeof value !== 'boolean' && isNumber(value),
    process: parseInt,
  },
  {
    check: (value) => typeof value === 'boolean' || typeof value === 'string',
    process: (value) => value,
  },
];

const fixIniParserOutput = (data) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    const { process } = valueActions.find(({ check }) => check(value));

    return { ...acc, [key]: process(value, fixIniParserOutput) };
  }, {});

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': (path) => fixIniParserOutput(ini.parse(path)),
};

const parse = (path, extension) => parsers[extension](path);

export default parse;
