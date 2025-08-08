#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import parseFile from '../src/parser.js';
import genDiff from '../src/converted.js';


const program = new Command();

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .version('1.0.0')
  .action((filepath1, filepath2, options) => {
    const resolvedPath1 = path.resolve(process.cwd(), filepath1);
    const resolvedPath2 = path.resolve(process.cwd(), filepath2);

    const data1 = parseFile(resolvedPath1);
    const data2 = parseFile(resolvedPath2);

    const result = genDiff(filepath1, filepath2);
    console.log(result)
    
    console.log('Parsed data from first file:', data1);
    console.log('Parsed data from second file:', data2);
    console.log('Format:', options.format);
  });

program.parse();


