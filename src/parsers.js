import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml'

const parseFile = (filepath) => {
  
  const content = fs.readFileSync(filepath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
};

export default parseFile;