import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (value) => !Number.isNaN(Number(value));

const valueActions = [
  {
    check: (value) => value instanceof Object,
    process: (value, fn) => fn(value),
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

const fixParser = (data) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    const { process } = valueActions.find(({ check }) => check(value));

    return { ...acc, [key]: process(value, fixParser) };
  }, {});

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': (path) => fixParser(ini.parse(path)),
};

export default (path, ext) => parsers[ext](path);
