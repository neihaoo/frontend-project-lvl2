import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (value) => !Number.isNaN(Number(value));

const fixIniParserOutput = (data) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    if (value instanceof Object) {
      return { ...acc, [key]: fixIniParserOutput(value) };
    }

    const processedValue = typeof value !== 'boolean' && isNumber(value) ? Number(value) : value;

    return { ...acc, [key]: processedValue };
  }, {});

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: (path) => fixIniParserOutput(ini.parse(path)),
};

const parse = (path, extension) => parsers[extension](path);

export default parse;
