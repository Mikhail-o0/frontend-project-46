import stylish from './stylish.js';
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
};

const format = (tree, style = 'stylish') => {
  if (!formatters[style]) {
    throw new Error(`Unknown format: ${style}`);
  }
  return formatters[style](tree);
};

export default format;