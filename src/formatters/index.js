import stylish from './stylish.js';
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
};

const format = (tree, style = 'stylish') => {
  if (style === 'json') {
    return JSON.stringify(tree);
  }
  return formatters[style](tree);
};

export default format;