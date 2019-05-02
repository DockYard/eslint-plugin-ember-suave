module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: [
    'import',
    'ember'
  ],
  env: {
    'browser': true
  },
  extends: require.resolve('./base.js'),
  rules: {
    // General
    eqeqeq: ['error', 'smart'],

    // ES6
    'arrow-parens': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'generator-star-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],
    'no-async-promise-executor': 'error',
    'no-duplicate-imports': 'error',
    'no-await-in-loop': 'error',
    'no-var': 'error',
    'no-return-await': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' }
    ],
    'prefer-destructuring': ['error', { array: false, object: true }, { enforceForRenamedProperties: false }],
    'prefer-spread': 'error',
    'prefer-template': 'error',

    'import/no-relative-parent-imports': 'error',

    // Overrides for Ember
    'new-cap': ['error', {
      'capIsNewExceptions': ['A']
    }],

    // Eslint ember
    'ember/new-module-imports': 'error',

    // Custom rules
    'ember-suave/lines-between-object-properties': ['error', 'always', { exceptAfterSingleLine: true }],
    'ember-suave/no-const-outside-module-scope': 'error',
    'ember-suave/no-direct-property-access': 'error',
    'ember-suave/require-access-in-comments': 'error'
  }
};
