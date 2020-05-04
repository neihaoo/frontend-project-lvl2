import yaml from 'js-yaml';

const getParser = (format) => {
  let parser;

  if (format === '.json') {
    parser = JSON.parse;
  } else if (format === '.yml') {
    parser = yaml.safeLoad;
  }

  return parser;
};

export default getParser;
