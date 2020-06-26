import stylishRender from './stylish.js';
import plainRender from './plain.js';

const formatters = {
  stylish: stylishRender,
  plain: plainRender,
  json: JSON.stringify,
};

export default (ast, format = 'stylish') => formatters[format](ast);
