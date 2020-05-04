import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (format) => {
  let parser;

  if (format === '.json') {
    parser = JSON.parse;
  } else if (format === '.yml') {
    parser = yaml.safeLoad;
  } else if (format === '.ini') {
    parser = ini.parse;
  }

  return parser;
};

export default getParser;
