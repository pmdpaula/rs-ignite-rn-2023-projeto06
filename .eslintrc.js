/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    }
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    // 'module-resolver',
    // 'simple-import-sort'
  ],
  'rules': {
    'indent': ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',

    'import/namespace': 0,
    'import/no-unresolved': [2, { ignore: ['^@'] }],

    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',
  },
  'settings': {
    'react': {
      'version': 'detect',
      'import/resolver:': {
        typescript: true,
        node: true
        // },
        // 'typescript': {
        //   'alwaysTryTypes': true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        //   'project': 'tsconfig.json',
        // },
        // 'node': {
        //   'project': ['tsconfig.json', 'package/tsconfig.json']
        // },
      },
      'babel-module': {}
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
  }
};
