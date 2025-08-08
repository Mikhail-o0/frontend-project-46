import { readFileSync } from 'fs';

function genDiff(filepath1, filepath2) {
  const json1 = JSON.parse(readFileSync(filepath1, 'utf8'));
  const json2 = JSON.parse(readFileSync(filepath2, 'utf8'));
  const allUniqueKey = [... new Set([...Object.keys(json1), ...Object.keys(json2)])].sort();
  const diffStr = allUniqueKey.map(key => {
    const value1 = json1[key];
    const value2 = json2[key];
      if (value1 !== undefined && value2 !== undefined) {
        if (value1 === value2) {
          return `    ${key}: ${value1}`;
        }
        return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`];
      };
      if (value1 !== undefined) {
        return `  - ${key}: ${value1}`;
      };
      return `  + ${key}: ${value2}`;
  }).flat();
  return ['{', ...diffStr, '}'].join('\n');
}

export default genDiff;