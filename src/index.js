import parseFile from './parsers.js'
import buildDiff from './buildDiff.js'
import format from './formatters/index.js';

function genDiff (filepath1, filepath2, formatName = 'stylish') {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const tree = buildDiff(file1, file2);
  return format(tree, formatName);
};

export default genDiff;