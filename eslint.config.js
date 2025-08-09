import js from '@eslint/js';
import globals from 'globals';
import pluginJsonc from 'eslint-plugin-jsonc';
import markdownPlugin from '@eslint/markdown';
import cssPlugin from '@eslint/css';
import jsoncParser from 'jsonc-eslint-parser';

export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn'
    }
  },
  {
    files: ['bin/*.js'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    languageOptions: {
      parser: jsoncParser
    },
    plugins: {
      jsonc: pluginJsonc
    },
    rules: {
      ...pluginJsonc.configs['recommended-with-json'].rules
    }
  },
  {
    files: ['**/*.md'],
    processor: markdownPlugin.processors.markdown
  },
  {
    files: ['**/*.css'],
    languageOptions: {
      parser: cssPlugin.parser
    },
    rules: {
      ...cssPlugin.configs.recommended.rules
    }
  }
];
