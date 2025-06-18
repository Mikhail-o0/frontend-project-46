#!/usr/bin/env node

const { program } = require('commander');

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')

program.parse();