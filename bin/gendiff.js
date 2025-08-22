#!/usr/bin/env node

import { Command } from 'commander'
import path from 'path'
import genDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .version('1.0.0')
  .action((filepath1, filepath2, options) => {
    const file1 = path.resolve(process.cwd(), filepath1)
    const file2 = path.resolve(process.cwd(), filepath2)

    const result = genDiff(file1, file2, options.format)
    console.log(result)
  })

program.parse()
