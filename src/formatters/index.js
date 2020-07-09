import stylishRender from './stylishRender.js';
import plainRender from './plainRender.js';

const formatters = {
  stylish: stylishRender,
  plain: plainRender,
  json: JSON.stringify,
};

const render = (ast, format = 'stylish') => formatters[format](ast);

export default render;
