import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');

  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      throw new Error('YAML parsing not implemented yet');
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
};

export default parseFile;